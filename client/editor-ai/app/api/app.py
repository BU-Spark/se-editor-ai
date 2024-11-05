from crypt import methods
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import pyrebase
from requests.exceptions import HTTPError
import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("secrets/secrets.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}}) 

config = {
    "apiKey": os.getenv("FIREBASE_API_KEY", "AIzaSyACdig4Db7849_aOJFxlMLi0j8MLmInBI8"),
    "authDomain": "se-editor-ai.firebaseapp.com",
    "projectId": "se-editor-ai",
    "storageBucket": "se-editor-ai.appspot.com",
    "messagingSenderId": "883583909136",
    "appId": "1:883583909136:web:564126f03409326681f995",
    "databaseURL": "https://se-editor-ai.firebaseio.com"
}

# Configure CORS settings to allow requests from your Next.js application
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = ['https://se-editor-ai-client-production.up.railway.app', 'http://localhost:3000']

# cred = credentials.Certificate(cred_route)
# firebase_admin.initialize_app(cred)
firebase = pyrebase.initialize_app(config)
auth2 = firebase.auth() 

# routes.register_blueprints(app)
@app.route("/api/verify-token", methods=["GET"])
def verify_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"message": "Authorization header is missing"}), 401
    token = auth_header.split(" ")[1] if " " in auth_header else None
    print(token)
    try:
        auth.verify_id_token(token)
        return jsonify({"message": "token is valid"}), 200
    except:
        return jsonify({"message": "invalid token"}), 401
    

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    try:
        user = auth2.sign_in_with_email_and_password(email, password)
        print(user)
        return jsonify({"access_token": user.get("idToken"), "uid": user.get("localId")}), 200
    except Exception as e:
        return jsonify({"error": e.args}), 400

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    display_name = data.get("displayName")
    try:
        auth.create_user(
            email=email,
            password=password,
            display_name=display_name,
        )
        return jsonify({"message": "Signup successful"}), 200
    except Exception as e:
        return jsonify({"error": e.args}), 400
    
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)