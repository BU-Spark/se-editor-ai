from flask import Flask
from firebase_admin import credentials
import firebase_admin
from .routes import *

# create_app Flask function

def create_app():

    app = Flask(__name__)
    cred = credentials.Certificate(r"./backend/secrets/se-editor-ai-firebase-adminsdk-nd6dz-b1262c7a32.json")
    firebase_admin.initialize_app(cred)

    routes.register_blueprints(app)


    return app