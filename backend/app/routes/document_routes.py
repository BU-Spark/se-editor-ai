from flask import Blueprint, request
from ..services import *
from ..utils import *


bp = Blueprint('document', __name__)
docsOrCollection = {"d": "docs", "c": "collection"}


@bp.route('/create', methods=['POST'])
def create_document():
    """
        Creates document.
        Input:
            user_id: The user's id
            document_name: The name of the document you want to add in
            document: The content of the document
    """
    try:
        fireconfig = firestore_service()
        data = request.json
        collection_route = [(docsOrCollection['c'], "documents"), \
                                (docsOrCollection['d'], data["user_id"]), \
                                    (docsOrCollection['c'], "docs") \
                            ]
        for i in fireconfig.get_all_documents(collection_route):
            if(i["Title"] == data["document_name"]):
                return handle_bad_request("Name already exists, please try again")
            
        res = fireconfig.add_document(collection_route, dateHandler.last_modified({"Title": data["document_name"], "Content": data["document"]}))
        if not res:
            return handle_server_error("Unknown error occured")
        return handle_success("Successfully posted!")

    except Exception as e:
        return handle_server_error(e)
    


@bp.route('/read/<userID>/<documentID>', methods=["GET"])
def get_document(userID, documentID):
    """
        Reads document with the given userID and documentID
    """

    try:
        fireconfig = firestore_service()

        collection_route = [(docsOrCollection['c'], "documents"), \
                                        (docsOrCollection['d'], userID), \
                                            (docsOrCollection['c'], "docs") \
                                    ]    
        
        res = fireconfig.get_document(collection_route, documentID)
        if not res:
            return handle_not_found()
        return handle_success(res)

    except Exception as e:
        return handle_server_error(e)
    
 

@bp.route('/update', methods=['PUT'])
def update_document():
    """
        Updates document.
        Input:
            user_id: The user's id
            document_name: The name(can be modified from the original name) of the document you want to add in 
            document_id: The id of the document you want to replace
            new_document: The content of the document you want the replace the old document to
    """
    try:
        fireconfig = firestore_service()
        data = request.json
        collection_route = [(docsOrCollection['c'], "documents"), \
                                (docsOrCollection['d'], data["user_id"]), \
                                    (docsOrCollection['c'], "docs") \
                            ]
        for i in fireconfig.get_all_documents(collection_route):
            if(i["Title"] == data["document_name"] and data["document_id"] != i["id"]):
                return handle_bad_request("Name already exists, please try again")

        newdoc = dateHandler.last_modified({"Title": data["document_name"], "Content": data["new_document"]})
        print(newdoc)

        res = fireconfig.update_document(collection_route, data["document_id"], newdoc)
        if not res:
            return handle_server_error("Unknown error occured")
        return handle_success("Successfully updated!")

    except Exception as e:
        return handle_server_error(e)
    


@bp.route('/delete/<userID>/<documentID>', methods=["DELETE"])
def delete_document(userID, documentID):
    """ Deletes document with given userID and documentID"""
    try:
        fireconfig = firestore_service()

        collection_route = [(docsOrCollection['c'], "documents"), \
                                        (docsOrCollection['d'], userID), \
                                            (docsOrCollection['c'], "docs") \
                                    ]    
        
        res = fireconfig.delete_document(collection_route, documentID)
        if not res:
            return handle_not_found()
        return handle_success("Successfully deleted!")

    except Exception as e:
        return handle_server_error(e)



@bp.route('/getall/<userID>', methods=["GET"])
def get_all_documents(userID):
    try:
        fireconfig = firestore_service()
        collection_route = [(docsOrCollection['c'], "documents"), \
                                        (docsOrCollection['d'], userID), \
                                            (docsOrCollection['c'], "docs") \
                                    ]    
        res = fireconfig.get_all_documents(collection_route)
        if not res:
            return handle_not_found()
        return handle_success(res)

    except Exception as e:
        return handle_server_error(e)
    
