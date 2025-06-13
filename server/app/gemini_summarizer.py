import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")

def summarize_text_with_gemini(text: str) -> str:
    prompt = f"""
    You're an expert legal assistant. Summarize the following legal document and highlight vague language, important clauses like arbitration, liability, and termination, and flag anything suspicious.

    Document:
    \"\"\"{text}\"\"\"
    """
    response = model.generate_content(prompt)
    return response.text.strip()
