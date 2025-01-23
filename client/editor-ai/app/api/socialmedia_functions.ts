import exp from "constants";

const postToFacebook = async (content:string) => {
    try {
        const response = await fetch(`https://se-editor-ai-production.up.railway.app/promotion/sns/facebook/${document}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
}

const postToTwitter = async (content:string) => {
    try {
        const response = await fetch(`https://se-editor-ai-production.up.railway.app/promotion/sns/twitter/${document}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
}



export { postToFacebook, postToTwitter };