from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()

    app = Flask(__name__)
    CORS(app)

    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret")
    JWTManager(app)

    from .routes import main
    from .auth import auth
    from .chat import chat
    app.register_blueprint(chat)
    app.register_blueprint(main)
    app.register_blueprint(auth)

    return app
