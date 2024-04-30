
export const handleCreateDocument = async (userId: string, documentName: string, documentContent: string) => {
    const documentData = JSON.stringify({
        user_id: userId,
        document_name: documentName,
        document: documentContent,
    });

    console.log('Document data:', documentData);

    try {
        const response = await fetch(`https://se-editor-ai-production.up.railway.app/documents/create`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: documentData,
        });

        console.log('Response:', response);

        if (response.status !== 200) {
            return null;
        }
        else {
            const data = await response.json();
            console.log('Data:', data);

            const documentId = data.data
            console.log('Document ID:', documentId);

            return documentId
        }
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

export const getDocuments = async (userId: string) => {
    console.log(`Getting documents for user: ${userId}`);
    try {
        const response = await fetch(`https://se-editor-ai-production.up.railway.app/documents/getall/${userId}`, {
        // const response = await fetch(`https://se-editor-ai-production.up.railway.app/documents/getall/${userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // console.log('Response:', response);

        const data = await response.json();

        // const documents = getDocuments(userId);
        // console.log('Data:', data);

        return data

    } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
    }
};

export const updateDocument = async (
    userId: string, 
    documentId: string, 
    documentName:string,
    new_document:string) => {

        const body = JSON.stringify({
            "user_id": userId,
            "document_name": documentName,
            "document_id": documentId,
            "new_document": new_document
        })

        // console.log('Body:', body);
    
        try {
            const response = await fetch(`https://se-editor-ai-production.up.railway.app/documents/update`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            });

            console.log('Response:', response);
            const data = await response.json();
            console.log(data)
    
    
        } catch (error) {
            console.error('Error getting documents:', error);
            throw error;
        }
    };

export const getDocument = async (userId: string, documentId: string) => {
    try {
        const response = await fetch(`https://se-editor-ai-production.up.railway.app/documents/read/${userId}/${documentId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // console.log('Response:', response);

        const data = await response.json();

        // console.log('Data:', data);
        return data;

    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

export const handleRemoveDocument = async (userId: string, documentId: string) => {
    try {
        const response = await fetch(`https://se-editor-ai-production.up.railway.app/documents/delete/${userId}/${documentId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Response:', response);

        const data = await response.json();

        console.log('Data:', data);
        return data;

    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};