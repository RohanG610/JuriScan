from flask import Blueprint, request, jsonify
from .summarizer import summarize_document

main = Blueprint("main", __name__)

@main.route("/api/summarize", methods=["POST"])
def summarize():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    summary, highlights = summarize_document(file)
    return jsonify({"summary": summary, "highlights": highlights})
