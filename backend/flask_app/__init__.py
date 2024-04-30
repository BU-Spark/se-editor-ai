from flask import Flask
from firebase_admin import credentials
import firebase_admin
from flask_cors import CORS
import os
from .routes import *
import json

# create_app Flask function

def create_app(cred_route=r"", Test=False) -> Flask:

    app = Flask(__name__)
    app.config["TESTING"] = Test

    # Enable CORS
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


    # Configure CORS settings to allow requests from your Next.js application
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['CORS_ORIGINS'] = ['http://localhost:3000']

    cred = credentials.Certificate(cred_route)
    # cred = credentials.Certificate(json.loads(os.getenv('FIREBASE_CREDENTIALS')))

    firebase_admin.initialize_app(cred)
    

    routes.register_blueprints(app)


    return app