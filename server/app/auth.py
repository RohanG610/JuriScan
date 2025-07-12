from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

auth = Blueprint('auth', __name__)

# PostgreSQL connection
conn = psycopg2.connect(
    database=os.getenv("PostGre_database"),
    user=os.getenv("PostGre_user"),
    password=os.getenv("PostGre_password"),
    host=os.getenv("PostGre_host"),
    port=os.getenv("PostGre_port"),
)
print("✅ PostgreSQL connected successfully.")
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
