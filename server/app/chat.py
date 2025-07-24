from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from openai import OpenAI
import os
import psycopg
from pgvector.psycopg import register_vector

from dotenv import load_dotenv
from .utils.pdf_utils import extract_text_from_pdf
from .utils.embedding_utils import get_embedding

load_dotenv()
chat = Blueprint("chat", __name__)

conn = psycopg.connect(os.getenv("DATABASE_URL"))
register_vector(conn)

# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@chat.route("/upload", methods=["POST"])
@jwt_required()
def upload_file():
    user_email = get_jwt_identity()
    file = request.files["file"]
    filename = secure_filename(file.filename)
    filepath = os.path.join("uploads/", filename)
    file.save(filepath)

    text = extract_text_from_pdf(filepath)
    print(text)
    summary_prompt = f"Summarize this legal document:\n{text[:1500]}"
    red_flags_prompt = f"Identify red flags in this legal document:\n{text[:1500]}"
    
    # summary = client.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=[{"role": "user", "content": summary_prompt}]
    # ).choices[0].message.content

    # red_flags = client.chat.completions.create(
    #     model="gpt-4",
    #     messages=[{"role": "user", "content": red_flags_prompt}]
    # ).choices[0].message.content

    summary = """
    This legal document is a Service Agreement between a freelance software developer and a startup client. It outlines the scope of services, timelines for deliverables, payment structure (including a 30% upfront deposit), and intellectual property transfer upon project completion. The agreement also includes clauses on confidentiality, dispute resolution via arbitration, and conditions for contract termination by either party with a 14-day written notice.
    """

    red_flags = """
    1. The agreement lacks a clear clause specifying what happens in case of a missed delivery deadline.
    2. There is no mention of liability limits in case the software causes business losses.
    3. The dispute resolution mechanism does not specify the arbitration venue or governing law.
    4. Intellectual property rights transfer is vaguely worded and may lead to ownership ambiguity.
    5. The termination clause lacks clarity on refunds if the client terminates after paying the deposit.
    """



    with conn.cursor() as cur:
        cur.execute("SELECT id FROM users WHERE email = %s", (user_email,))
        user_id = cur.fetchone()[0]

        cur.execute("""
            INSERT INTO chat_sessions (user_id, title, file_name, summary, red_flags)
            VALUES (%s, %s, %s, %s, %s) RETURNING id
        """, (user_id, filename, filename, summary, red_flags))
        session_id = cur.fetchone()[0]

        embedding = get_embedding(text[:2000])
        cur.execute("""
            INSERT INTO chat_messages (session_id, user_email, content, embedding)
            VALUES (%s, %s, %s, %s)
        """, (session_id, user_email, text[:2000], embedding))
        conn.commit()

    return jsonify({
        "session_id": session_id,
        "summary": summary,
        "red_flags": red_flags
    })

from .utils.retriever_utils import retrieve_answer  # <-- implement this function

@chat.route("/chat/ask", methods=["POST"])
@jwt_required()
def ask_question():
    data = request.json
    message = data.get("message")
    session_id = data.get("session_id")
    user_email = get_jwt_identity()

    if not message or not session_id:
        return jsonify({"error": "Missing message or session_id"}), 400

    # Generate answer using custom retriever
    answer = retrieve_answer(message, session_id)

    # Store user question + assistant response
    with conn.cursor() as cur:
        # Save user message
        user_embedding = get_embedding(message)
        cur.execute("""
            INSERT INTO chat_messages (session_id, sender, message, embedding)
            VALUES (%s, %s, %s, %s)
        """, (session_id, "user", message, user_embedding))

        # Save assistant response
        cur.execute("""
            INSERT INTO chat_messages (session_id, sender, message)
            VALUES (%s, %s, %s)
        """, (session_id, "assistant", answer))

        conn.commit()

    return jsonify({ "answer": answer })