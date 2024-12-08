from flask import Blueprint, request
from ..utils import *
from flask_cors import cross_origin, CORS
import requests
import json

bp = Blueprint('api', __name__)
CORS(bp)

@bp.route('/fetchImages', methods=['POST'])
@cross_origin()
def fetch_images():
    try:
        with open('secrets/secrets.json') as file:
            secrets = json.load(file)
        UNSPLASH_ACCESS_KEY = secrets.get('UNSPLASH_ACCESS_KEY')

        data = request.json
        keywords = data.get('keywords', [])[:3]
        results = []
        unique_ids = set()

        for keyword in keywords:
            response = requests.get(
                f'https://api.unsplash.com/search/photos?query={keyword}&per_page=3',
                headers={'Authorization': f'Client-ID {UNSPLASH_ACCESS_KEY}'}
            )
            
            if response.status_code == 200:
                data = response.json()
                for result in data['results']:
                    if result['id'] not in unique_ids:
                        unique_ids.add(result['id'])
                        results.append({
                            'url': result['urls']['regular'],
                            'source': f"{result['user']['name']} on Unsplash"
                        })
        return handle_success(results)
    except Exception as e:
        return handle_server_error(e)