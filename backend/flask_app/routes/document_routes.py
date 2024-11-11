from flask import Blueprint, request
from ..services import firestore_service
from ..utils import *
from flask_cors import cross_origin, CORS


bp = Blueprint('documents', __name__)
CORS(bp)
docsOrCollection = {"d": "docs", "c": "collection"}

@bp.route('/create', methods=['POST'])
@cross_origin()
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

        if not res[0]:
            return handle_server_error("Unknown error occured")
        
        return handle_success("Successfully posted!", res[1])


    except Exception as e:
        return handle_server_error(e)
    


@bp.route('/read/<userID>/<documentID>', methods=["GET"])
@cross_origin()
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
        return handle_success(list(res)[0])

    except Exception as e:
        return handle_server_error(e)
    
 

@bp.route('/update', methods=['PUT'])
@cross_origin()
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

        res = fireconfig.update_document(collection_route, data["document_id"], newdoc)
        if not res:
            return handle_server_error("Unknown error occured")
        return handle_success("Successfully updated!")

    except Exception as e:
        return handle_server_error(e)
    


@bp.route('/delete/<userID>/<documentID>', methods=["DELETE"])
@cross_origin()
def delete_document(userID, documentID):
    """ Deletes document with given userID and documentID """
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
@cross_origin()
def get_all_documents(userID):
    """ Returns all the documents of a given user """
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
    


    
@bp.route('/updateCategory', methods=['PATCH'])
@cross_origin()
def update_document_category():
    """
        Updates the category of a document.
        Input:
            user_id: The user's id
            document_id: The ID of the document to update
            category: The new category to set for the document
    """
    try:
        fireconfig = firestore_service()
        data = request.json

        # Validate input
        user_id = data.get("user_id")
        document_id = data.get("document_id")
        category = data.get("category")

        if not user_id or not document_id or not category:
            return handle_bad_request("Missing required fields: user_id, document_id, or category")

        # Define the path to the document
        collection_route = [
            (docsOrCollection['c'], "documents"),
            (docsOrCollection['d'], user_id),
            (docsOrCollection['c'], "docs")
        ]

        # Update the document with the new category
        update_data = {"Category": category}
        res = fireconfig.update_document(collection_route, document_id, update_data)

        if not res:
            return handle_server_error("Failed to update document category")

        return handle_success("Category updated successfully")

    except Exception as e:
        return handle_server_error(str(e))


