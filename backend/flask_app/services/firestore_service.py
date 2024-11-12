from firebase_admin import firestore

# Takes care of all the firestore database CRUD operations

class firestore_service:

    def __init__(self):
        
        self.db = firestore.client()


    
    def parse_firestore_data(self, path: "list[tuple[str, str]]"):
        """Pareses the input field to navigate to the right data location"""
        ref = self.db
        for i, segment in path:
            if i == "collection":  # Collection expected
                ref = ref.collection(segment)
            else:  # Document expected
                ref = ref.document(segment)
        return ref
    


    def add_document(self, collection_navigation: "list[tuple[str, str]]", document_data: dict) -> "tuple[bool, str]":
        """Addes document given the path"""
        try:
            ref = self.parse_firestore_data(collection_navigation)
            new_doc_ref = ref.document()
            new_doc_ref.set(document_data)
            return (True, new_doc_ref.id)
        except Exception as e:
            print(f"Failed to add document: {e}")
            return (False, "")


    def get_document(self, collection_navigation: "list[tuple[str, str]]", document_id: str) -> dict:
        """Gets documents given the path and ID, including the document's ID in the return."""
        try:
            ref = self.parse_firestore_data(collection_navigation + [("document", document_id)])
            document = ref.get()
            if document.exists:
                document_data = document.to_dict() 
                document_data['id'] = document_id  
                return (document_data, document_id)
            else:
                return None
        except Exception as e:
            print(f"Failed to get document: {e}")
            return None


    def update_document(self, collection_navigation: "list[tuple[str, str]]", document_id: str, update_data: dict) -> bool:
        """Updates document given the path and document ID"""
        try:
            ref = self.parse_firestore_data(collection_navigation + [["document", document_id]])
            ref.update(update_data)
            return True
        except Exception as e:
            print(f"Failed to update document: {e}")
            return False



    def delete_document(self, collection_navigation: "list[tuple[str, str]]", document_id: str) -> bool:
        """Deletes documents given the path and ID"""
        try:
            ref = self.parse_firestore_data(collection_navigation + [["document", document_id]])
            ref.delete()
            return True
        except Exception as e:
            print(f"Failed to delete document: {e}")
            return False


    def get_all_documents(self, collection_navigation: "list[tuple[str, str]]") -> "list[dict]":
        """Gets all documents in the path, including each document's ID in their respective return."""
        try:
            ref = self.parse_firestore_data(collection_navigation)
            documents = ref.stream()
            all_documents = []
            for doc in documents:
                doc_data = doc.to_dict()
                doc_data["id"] = doc.id  
                all_documents.append(doc_data)
            return all_documents
        except Exception as e:
            print(f"Failed to get all documents: {e}")
            return []

