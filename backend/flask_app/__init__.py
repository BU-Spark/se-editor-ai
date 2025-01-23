from flask import Flask
from firebase_admin import credentials
import firebase_admin
from flask_cors import CORS
import os
from .routes import *
import json

# create_app Flask function

def create_app(cred_route="", Test=False) -> Flask:
    if(cred_route == ""):
        cred_route = json.loads(os.getenv('FIREBASE_CREDENTIALS'))
    app = Flask(__name__)
    app.config["TESTING"] = Test

    # Enable CORS
    CORS(app, resources={r"/*": {"origins": "*"}}) 


    # Configure CORS settings to allow requests from your Next.js application
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['CORS_ORIGINS'] = ['https://se-editor-ai-client-production.up.railway.app', 'http://localhost:3000']

    cred = credentials.Certificate(cred_route)
    firebase_admin.initialize_app(cred)
    

    routes.register_blueprints(app)
    @app.route('/')
    def health():
        return "Hello World", 200


    return app