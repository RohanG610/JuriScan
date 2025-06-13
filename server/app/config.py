import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///dev.db")  # for now
    SQLALCHEMY_TRACK_MODIFICATIONS = False
