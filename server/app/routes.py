from flask import Blueprint, request, jsonify
from .summarizer import summarize_document
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

main = Blueprint("main", __name__)

# PostgreSQL connection
conn = psycopg2.connect(
    database=os.getenv("PostGre_database"),
    user=os.getenv("PostGre_user"),
    password=os.getenv("PostGre_password"),
    host=os.getenv("PostGre_host"),
    port=os.getenv("PostGre_port"),
)


# --------------------- Document Summarization ---------------------

@main.route("/api/summarize", methods=["POST"])
def summarize():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    summary, highlights = summarize_document(file)
    return jsonify({"summary": summary, "highlights": highlights})


# --------------------- Lawyer Hiring Features ---------------------

@main.route("/lawyers", methods=["GET"])
def get_lawyers():
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, rate, location, specialization, availability, languages, bio FROM lawyers")
    rows = cursor.fetchall()
    result = [
        {
            "id": row[0],
            "name": row[1],
            "rate": row[2],
            "location": row[3],
            "specialization": row[4],
            "availability": row[5],
            "languages": row[6],
            "bio": row[7],
        }
        for row in rows
    ]
    return jsonify(result)


@main.route("/hire-lawyer", methods=["POST"])
def hire_lawyer():
    data = request.json
    user_email = data.get("email")
    lawyer_id = data.get("lawyerId")
    description = data.get("description")
    contact_method = data.get("contactMethod")

    if not all([user_email, lawyer_id, description, contact_method]):
        return jsonify({"message": "Missing fields"}), 400

    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO hiring_requests (user_email, lawyer_id, description, contact_method) VALUES (%s, %s, %s, %s)",
        (user_email, lawyer_id, description, contact_method)
    )
    conn.commit()
    return jsonify({"message": "Hiring request submitted successfully"}), 200
