from flask import Blueprint, request, jsonify, redirect, session
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
import os
from dotenv import load_dotenv
import requests
from oauthlib.oauth2 import WebApplicationClient

load_dotenv()

auth = Blueprint('auth', __name__)
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
client = WebApplicationClient(GOOGLE_CLIENT_ID)

# PostgreSQL connection
conn = psycopg2.connect(
    database=os.getenv("PostGre_database"),
    user=os.getenv("PostGre_user"),
    password=os.getenv("PostGre_password"),
    host=os.getenv("PostGre_host"),
    port=os.getenv("PostGre_port"),
)
print("✅ PostgreSQL connected successfully.")

# 🔐 Manual Register
@auth.route("/auth/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "citizen")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    with conn.cursor() as cursor:
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"message": "User already exists."}), 400

        hashed_password = generate_password_hash(password)
        cursor.execute(
            "INSERT INTO users (email, password, role, name) VALUES (%s, %s, %s, %s)",
            (email, hashed_password, role, name)
        )
        conn.commit()

    token = create_access_token(identity=email)
    return jsonify(token=token), 200

# 🔐 Manual Login
@auth.route("/auth/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    with conn.cursor() as cursor:
        cursor.execute("SELECT password FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if not user or not check_password_hash(user[0], password):
            return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=email)
    return jsonify(token=token), 200

# 🌐 Google OAuth Step 1: Redirect to Google
@auth.route("/auth/google")
def login_google():
    google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]
    
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri="http://localhost:5000/auth/google/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

# 🌐 Google OAuth Step 2: Callback from Google
@auth.route("/auth/google/callback")
def google_callback():
    code = request.args.get("code")
    google_provider_cfg = requests.get(GOOGLE_DISCOVERY_URL).json()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url="http://localhost:5000/auth/google/callback",
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    client.parse_request_body_response(token_response.text)
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    userinfo = userinfo_response.json()
    email = userinfo["email"]
    name = userinfo["name"]
    google_id = userinfo["sub"]

    with conn.cursor() as cursor:
        # Check if user exists by google_id or email
        cursor.execute("SELECT id FROM users WHERE google_id = %s OR email = %s", (google_id, email))
        user = cursor.fetchone()

        if not user:
            cursor.execute(
                "INSERT INTO users (email, name, role, google_id) VALUES (%s, %s, %s, %s)",
                (email, name, "citizen", google_id)
            )
            conn.commit()

    token = create_access_token(identity=email)
    return redirect(f"http://localhost:3000/oauth-success?token={token}")
