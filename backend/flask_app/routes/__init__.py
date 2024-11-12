import imp
from flask import Flask
from .document_routes import bp as doc_bp
from .auth_routes import auth_bp
# from .AI_routes import bp as AI_bp <- add back when fixed
# from .promotion_routes import bp as promotion_bp <- add back when fixed

# Here lies all the routes that are needed for this backend to operate (authentication, document)


"""A function to register all the blueprints."""
def register_blueprints(app: Flask):
    app.register_blueprint(doc_bp, url_prefix='/documents')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    # app.register_blueprint(AI_bp, url_prefix='/AI') <- add back when fixed
    # app.register_blueprint(promotion_bp, url_prefix='/promotion') <- add back when fixed
