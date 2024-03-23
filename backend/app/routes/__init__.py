from flask import Flask
from .document_routes import bp as auth_bp


# Here lies all the routes that are needed for this backend to operate (authentication, document)


"""A function to register all the blueprints."""
def register_blueprints(app: Flask):
    app.register_blueprint(auth_bp, url_prefix='/document')
