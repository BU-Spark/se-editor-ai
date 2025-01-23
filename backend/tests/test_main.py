from flask_app import create_app
import pytest
import random
import uuid
import random



@pytest.fixture(scope="module")
def client():
    """ App client for testing """
    app = create_app(r"../secrets/se-editor-ai-firebase-adminsdk-nd6dz-b1262c7a32.json", True) # init Flask app with test config, adjust route to secrets if needed too
    with app.test_client() as client:
        with app.app_context():
            yield client

# ----------------------------------------
#   FACTORIES FOR DOCUMENT TESTING
# ----------------------------------------
@pytest.fixture(scope="function")
def user_factory():
    """ User factory """
    users = []

    def create_user(username):
        """ Create user with given username """
        users.append(username)
        return username
    
    def create_random_user():
        """ Create a user with random username """
        s = uuid.uuid4().hex[:8]
        users.append(s)
        return s

    def remove_user(username):
        """ Remove a user """
        users.remove(username)

    def clear_user():
        """ Clear all users"""
        users.clear()

    def get_users():
        """ Get all users """
        return users

    yield create_user, create_random_user, remove_user, get_users, clear_user
    users.clear()


@pytest.fixture(scope="function")
def document_factory(client):
    """ Document factory """

    def create_document(user_id:str, val=""):
        """ Create document """
        response = client.post('/documents/create', json={
            "user_id": user_id,
            "document_name": f"Document by {user_id} with value {val}",
            "document": f"This is the content of the document by {user_id} with value {val}"
        })
        return response
    
    def read_document(user_id:str, doc_id:str):
        """ Read document """
        response = client.get(f"/documents/read/{user_id}/{doc_id}")
        return response
    
    def read_all_document(user_id:str):
        """ Read all document """
        response = client.get(f"/documents/getall/{user_id}")
        return response
    
    def update_document(user_id:str, doc_id:str, val=""):
        """ Update document """
        response = client.put(f"/documents/update", json={
            "user_id": user_id,
            "document_name": f"Document by {user_id} with value {val}",
            "document_id": f"{doc_id}",
            "new_document": f"This is the content of the document by {user_id} with value {val}"
        })
        return response
    
    def delete_document(user_id: str, doc_id: str):
        """ Delete document """
        response = client.delete(f"/documents/delete/{user_id}/{doc_id}")
        return response

    yield create_document, read_document, read_all_document, update_document, delete_document




# ----------------------------------------
#  DOCUMENT TESTING STUFF
# ----------------------------------------
class Test_document_management():
    """ Class for testing document routes """
    
    def test_create_document(client, user_factory, document_factory):
        """ Ensure create document works """
        NUM_CLIENTS = 10
        _, create_random_user, _, get_users, _ = user_factory
        create_document, _, _, _, delete_document = document_factory
        added_documents = list()
        test_result = list() # list of list (user_id, document_id, num_docs)

        try:
            # Initial setup for test
            for i in range(NUM_CLIENTS): # Create users for test
                create_random_user()
                test_result.append([False, ""])
            curr_users = get_users()


            # Always create document with first id
            res1 = create_document(curr_users[0])
            test_result[0] = [(res1.status_code == 200 and \
                            res1.json["message"] == "Successfully posted!"), "Create"] # Create document with first id
            added_documents.append([curr_users[0], res1.json["data"]])


            # Create document or watch it fail lol
            for num, id in enumerate(curr_users[1:], start=1):
                if random.choice([True, False]): # Randomly choose for a bad test
                    res = create_document(curr_users[0])
                    test_result[num] = [res.status_code == 400 and \
                                        res.json == {'message': 'Name already exists, please try again'}, "Bad Request"] # Test for error cases with adding the same name
                else: # else test for normal creation
                    res = create_document(id)
                    test_result[num] = [(res.status_code == 200 and \
                                res.json["message"] ==  "Successfully posted!"), "Create"] # Test for create document
                    
                    added_documents.append([curr_users[num], res.json["data"]]) # add for future delete
                
        except Exception as err:
            assert False, f"An unexpected exception occurred: {err}"

        assert all(result for result, msg in test_result), "\n".join(msg for result, msg in test_result if not result) # Test
        for user_id, doc_id in added_documents: # Delete the created documents
            delete_document(user_id, doc_id)


    

    def test_read_document(client, user_factory, document_factory):
        """ Ensure read document works """
        NUM_CLIENTS = 10
        _, create_random_user, _, get_users, _ = user_factory
        create_document, read_document, _, _, delete_document = document_factory
        test_result = list()
        added_documents = list() # list of list (user_id, document_id, num_docs)
        try:
            # Initial setup for test
            for i in range(NUM_CLIENTS): # Create users for test
                create_random_user()
                test_result.append([False, ""])
            curr_users = get_users()


            # Create documents to read
            for num, user_id in enumerate(curr_users):
                if random.choice([True, False]): # Randomly choose for a bad test
                    added_documents.append([user_id, "Bad Request"])
                    continue
                res = create_document(user_id)
                added_documents.append([user_id, res.json["data"]])


            # Test reading documents
            for num, id in enumerate(added_documents):
                user_id, doc_id = id
                if(doc_id == "Bad Request"): # Test for bad request
                    res = read_document(user_id, doc_id)
                    test_result[num] = [res.json["message"] == "not found" and \
                                        res.status_code == 404, "Bad Request"]
                else: # Test for good read
                    res = read_document(user_id, doc_id)
                    test_result[num] = ([res.json["message"]["Title"] == f"Document by {user_id} with value " and \
                                    res.status_code == 200, "Read"])  
                    
        except Exception as err:
            assert False, f"An unexpected exception occurred: {err}"

        assert all(result for result, msg in test_result), "\n".join(msg for result, msg in test_result if not result) # Test
        for user_id, doc_id in added_documents: # Delete the created documents
            delete_document(user_id, doc_id)        




    def test_readAll_document(client, user_factory, document_factory):
        """ Ensure read all document works """
        NUM_CLIENTS = 10
        _, create_random_user, _, get_users, _ = user_factory
        create_document, _, read_all_document, _, delete_document = document_factory
        test_result = list()
        added_documents = list() # list of list (user_id, document_id, num_docs)
        tesst_init = list()

        try:
            # Initial setup for test
            for i in range(NUM_CLIENTS): # Create users for test
                create_random_user()
                test_result.append([False, ""])
            curr_users = get_users()

            # Create documents for readAll
            for users in curr_users:
                num_docs = random.randint(0,5)
                for i in range(num_docs):
                    if num_docs == 0: # Test case for errors
                        break
                    res = create_document(users, i)
                    added_documents.append([users, res.json["data"], num_docs])
                tesst_init.append([users, num_docs])


            for num, val in enumerate(tesst_init):
                user_id, num_docs = val

                res = read_all_document(user_id)
                if(num_docs == 0): # Error case
                    expected_output = {"message": "not found"}
                    expected_status_code = 404
                    is_pass = expected_output == res.json and expected_status_code == res.status_code
                    test_result[num] = [is_pass, "not found"]
                else: # ReadAll case
                    is_pass = True
                    for i in range(num_docs):
                        expected_output = f"This is the content of the document by {user_id} with value {i}"
                        expected_status_code = 200
                        is_pass = res.json["message"][i]["Content"][:-5] == expected_output[:-5] and res.status_code == expected_status_code and is_pass
                    test_result[num] = [is_pass, "readAll"]

        except Exception as err:
            assert False, f"An unexpected exception occurred: {err}"

        assert all(result for result, msg in test_result), "\n".join(msg for result, msg in test_result if not result) # Test

        for user_id, doc_id, _ in added_documents: # Delete the created documents
            delete_document(user_id, doc_id)
        



    def test_update_document(client, user_factory, document_factory):
        """ Ensure update document works """

        _, create_random_user, _, get_users, _ = user_factory
        create_document, _, read_all_document, update_document, delete_document = document_factory
        test_result = list()
        added_documents = list() # list of list (user_id, document_id)

        try:

            # Setup: Create a user and a document
            user_id = create_random_user()
            create_res = create_document(user_id)
            assert create_res.status_code == 200, "Failed to create document for update test"
            doc_id = create_res.json["data"] 

            # Test update process
            update_res = update_document(user_id, doc_id)
            test_result.append((update_res.status_code == 200 and update_res.json["message"] == "Successfully updated!",
                                "Update"))
        except Exception as err:
            assert False, f"An unexpected exception occurred: {err}"

        # Test
        assert all(result for result, msg in test_result), "\n".join(msg for result, msg in test_result if not result)
        delete_res = delete_document(user_id, doc_id)
        assert delete_res.status_code == 200, "Failed to delete document after update test"



    def test_delete_document(client, user_factory, document_factory):
        """ Ensure delete document works """
        
        _, create_random_user, _, _, _ = user_factory
        create_document, read_document, _, _, delete_document = document_factory
        test_results = list()

        # Setup: Create a user and a document
        user_id = create_random_user()
        create_res = create_document(user_id)
        assert create_res.status_code == 200, "Failed to create document for delete test"
        doc_id = create_res.json["data"]  

        # Perform the delete operation
        delete_res = delete_document(user_id, doc_id)
        test_results.append((delete_res.status_code == 200 and delete_res.json["message"] == "Successfully deleted!", "Delete"))

        # Verification: ensure that the document no longer exists
        # This step assumes your API returns a specific status or message for non-existent documents
        verify_res = read_document(user_id, doc_id)
        print(verify_res.json, "ahahah")
        not_found = verify_res.status_code == 404 or verify_res.json["message"] == "not found"
        test_results.append((not_found, "Delete verification failed: Document still exists after deletion"))

        # Assert all results are True (i.e., all tests passed)
        assert all(result for result, msg in test_results), "\n".join(msg for result, msg in test_results if not result)
