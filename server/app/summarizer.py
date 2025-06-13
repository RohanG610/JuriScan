import os
import google.generativeai as genai
from dotenv import load_dotenv
from .utils.pdf_parser import extract_text_from_pdf
from .clause_detector import find_clauses

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("models/gemini-1.5-pro-latest")

CHUNK_SIZE = 8000  # character count per chunk (can adjust)

def chunk_text(text, chunk_size=CHUNK_SIZE):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

def summarize_text_with_gemini(text: str) -> str:
    prompt = f"""
    You're an expert legal assistant. Summarize the following legal document and highlight vague language, important clauses like arbitration, liability, and termination, and flag anything suspicious.

    Document:
    \"\"\"{text}\"\"\"
    """
    response = model.generate_content(prompt)
    return response.text.strip()

def summarize_document(file):
    text = extract_text_from_pdf(file)
    chunks = chunk_text(text)
    
    summaries = []
    for idx, chunk in enumerate(chunks):
        try:
            print(f"Summarizing chunk {idx + 1}/{len(chunks)}...")
            summary = summarize_text_with_gemini(chunk)
            summaries.append(f"--- Chunk {idx+1} ---\n{summary}\n")
        except Exception as e:
            summaries.append(f"--- Chunk {idx+1} failed ---\n{str(e)}\n")

    full_summary = "\n".join(summaries)
    highlights = find_clauses(text)

    return full_summary, highlights
