from flask import Blueprint, request
from ..services import editorai_chatbot
from ..utils import *
from flask_cors import cross_origin, CORS

bp = Blueprint('AI', __name__)
CORS(bp)

@bp.route('/generateTitle', methods=['POST'])
@cross_origin()
def generate_title():
    """ """
    try:
        AIconfig = editorai_chatbot()
        data = request.json
        content = AIconfig.create_title(data["document"])
        if(not content):
            return requestHandler.handle_server_error
        return handle_success(content)
    except Exception as e:
         handle_server_error(e)


@bp.route('/generateSource', methods=['POST'])
@cross_origin
def generate_source():
    """ """
    try:
        AIconfig = editorai_chatbot()
        data = request.json
        content = AIconfig.generate_source(data["document"])
        if(not content):
            return requestHandler.handle_server_error
        return handle_success(content)
    except Exception as e:
            handle_server_error(e)



@bp.route('/summarize', methods=['POST'])
@cross_origin
def summarize_article():
    try:
        AIconfig = editorai_chatbot()

        data = request.json
        content = AIconfig.summarize_article(data["document"])
        if(not content):
            return requestHandler.handle_server_error
        return handle_success(content)
    except Exception as e:
        handle_server_error(e)

