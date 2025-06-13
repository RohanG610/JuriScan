import re

KEYWORDS = ["arbitration", "liability", "termination", "jurisdiction", "confidentiality"]

def find_clauses(text):
    return [kw.capitalize() for kw in KEYWORDS if re.search(rf"\b{kw}\b", text, re.IGNORECASE)]
