from flask import Blueprint, request, jsonify
from ..services import firestore_service
from ..utils import *
from flask_cors import cross_origin, CORS
from crypt import methods
import os
import json
import pyrebase
from requests.exceptions import HTTPError
from firebase_admin import credentials, auth

auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)

# add firebase api config below
config =
firebase = pyrebase.initialize_app(config)
auth2 = firebase.auth() 

@auth_bp.route("/verify-token", methods=["GET"], endpoint="auth_verify_token")
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

@auth_bp.route("/login", methods=["POST"], endpoint="auth_login")
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

@auth_bp.route("/signup", methods=["POST"], endpoint="auth_signup")
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