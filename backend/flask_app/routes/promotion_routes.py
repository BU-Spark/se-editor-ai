from flask import Blueprint, request
from ..services import editorai_promotebot
from ..utils import *
from flask_cors import cross_origin, CORS

bp = Blueprint('documents', __name__)
CORS(bp)



@bp.route('/sns/generate', methods=['POST'])
@cross_origin
def make_sns():
    """
        Generates social networking service contents given 
        Input:           
            document: The content of the document
    """
    try:
        AIconfig = editorai_promotebot()

        data = request.json
        content = AIconfig.create_social_media_copy(data["document"])
        if(not content):
            return requestHandler.handle_server_error
        return handle_success(content)
    except Exception as e:
        handle_server_error(e)



@bp.route('/sns/facebook', methods=['POST'])
@cross_origin
def post_facebook():
    """
        Posts given document to facebook.
        Input:           
            document: The content of the document
    """
    try:
        AIconfig = editorai_promotebot()

        data = request.json
        is_success, content = AIconfig.post_to_facebook(data["document"])
        if(not is_success):
            return requestHandler.handle_server_error
        return handle_success(content)
    except Exception as e:
        handle_server_error(e)



@bp.route('/sns/twitter', methods=['POST'])
@cross_origin
def post_twitter():
    """
        Posts given document to twitter.
        Input:           
            document: The content of the document
    """
    try:
        AIconfig = editorai_promotebot()
        data = request.json
        is_success, content = AIconfig.post_to_twitter(data["document"])
        if(not is_success):
            return requestHandler.handle_server_error
        return handle_success(content)
    except Exception as e:
        handle_server_error(e)
