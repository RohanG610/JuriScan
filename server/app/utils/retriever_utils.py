import os
import psycopg
import numpy as np
from pgvector.psycopg import register_vector
from openai import OpenAI
from .embedding_utils import get_embedding
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Setup pgvector connection
conn = psycopg.connect(os.getenv("DATABASE_URL"))
register_vector(conn)


def retrieve_answer(user_question: str, session_id: int, top_k: int = 4) -> str:
    """
    Uses pgvector to search for similar message embeddings and builds a RAG-style prompt.
    """
    # Get query embedding
    query_embedding = get_embedding(user_question)

    # Perform vector similarity search using pgvector
    with conn.cursor() as cur:
        cur.execute("""
            SELECT message
            FROM chat_messages
            WHERE session_id = %s
            ORDER BY embedding <-> %s
            LIMIT %s
        """, (session_id, query_embedding, top_k))

        relevant_chunks = [row[0] for row in cur.fetchall()]

    # Construct the RAG prompt
    context = "\n\n".join(relevant_chunks)
    prompt = f"""You are a legal assistant helping a user based on previous conversation.
Here is the context from uploaded legal document and chat history:

{context}

User question: {user_question}

Answer in a clear, helpful, and concise manner:
"""

    # Call OpenAI API
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{ "role": "user", "content": prompt }],
        temperature=0.4,
    )

    return response.choices[0].message.content
