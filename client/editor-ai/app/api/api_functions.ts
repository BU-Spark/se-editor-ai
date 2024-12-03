const BASE_URL = 'https://se-editor-ai-production.up.railway.app';
// const BASE_URL = 'http://127.0.0.1:5000';

export const fetchImagesForKeywords = async (keywords: string[]): Promise<Array<{url: string, source: string}>> => {
    try {
      const response = await fetch(`${BASE_URL}/api/fetchImages`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const result = await response.json();
      return result.message;
      
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };