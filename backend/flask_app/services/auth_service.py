from firebase_admin import credentials, auth
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin


""" TODO: """
class auth_service:

    def __init__(self):
        pass

    def add_new_user(self, userInfo: dict):
        pass

    def update_user(self, userInfo: dict):
        pass

    def delete_user(self, userID: str):
        pass

    def get_user(self, userID: str):
        pass

    def get_all_users(self):
        pass
