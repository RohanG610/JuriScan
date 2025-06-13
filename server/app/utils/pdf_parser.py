from io import BytesIO
from pdfminer.high_level import extract_text

def extract_text_from_pdf(file) -> str:
    file_stream = BytesIO(file.read())
    return extract_text(file_stream)
