# Editor-AI: An AI integrated editing tool for hyperlocal journalists


## Table of Contents
1. [Description](#description)
2. [Getting Started](#getting-started)
3. [Files](#files)
4. [Testing](#testing)
4. [API Documentation](#API-documentation)
5. [Future Work](#future-work)
6. [Contact Info](#contact-info)

# Description:
This is the documentations for the backend side of Editor-AI.
Using Flask as middleware; Firebase Firestore is used for data storage; Kaggle for the language models

# Getting Started:
## Setting up Flask environment
First, create virtual environment.
1. `pip install virtualenv`
2. `virtualenv venv`
3. `source venv/bin/activate` - to preface, this can be different from person to person

## Check requirements.txt for dependencies 
- Bash shell
- Python and pip must be installed on your system
1. `cd path/to/your/project`
2. `pip install -r requirements.txt`


## To Run locally
1. Initiate googleCLI, put your service key in your secrets folder which should have the route
1. Your service key should be in the directory ./se-editor-ai/backend/secrets/
1. In __main__.py, replace cred_route to the route to your secrets
1. Navigate to ./se-editor-ai/backend/
1. run ```python3 -m flask_app```

## To build for testing
1. Change cred_routes in ./flask_app/__init__.py to reflect the routes to firestore cred
1. run ```gunicorn -w 4 -b :8000 "flask_app:create_app()"```

## CI/CD pipeline
1. Refer to Railway document: https://railway.app/new/template/zUcpux
1. It is connected to dev branch GitHub



# Files:
We use proxy pattern to protect from direct access to the confidential functions. 
Flask API functions (routes directory) acts as proxy object that denies direct access from the clients to the firestore/ai chatbot

### routes
    Contains all the route info for the APIs
    ./AI_routes.py -> routes for AI functionalities
    ./document_routes.py -> routes for Firestore document functionalities
    ./promotion_routes.py -> routes for promotions (posting to Facebook, Twitter, etc)

### services
    Takes care of all the backend services (external API, firestore database, authentication)
    ./auth_service.py -> **bold** TODO: Migrate the auth services from frontend to backend. Skeleton code provided (20 extra credit points) **bold**
    ./editorai_chatbot.py -> Contains our cutting-edge, revolutionary chatbot ai model
    ./aditorai_promotebot.py -> Contains functions for promotion purposes and all that. **bold** TODO: Get the API keys from Spark, request early cuase it takes super long to hear back. **bold**
    ./firestore_service.py -> Connects to Firestore database

### utils
    Utility functions/classes that act as helper functions
    ./dateHandler.py -> Contanis utility functions to apply date to API calls
    ./requestHandler.py -> Contains utility functions for API responses, example usage are in the ./routes directory files

### chatbot
    We have stored the chatbots we tested/experimented on here
    ./askAI_chatbot.py -> Chatbot functionalities
    ./gpt2_chatbot.py -> Chatbot functionalities with gpt2 model
    ./promote_chatbot.py -> For promotion ai


# Testing:
To perform unit tests:
1. Navigate ./se-editor-ai/backend/tests directory
1. Run pytest

# API Documentation:
Refer to the link for API information.
https://app.swaggerhub.com/apis-docs/JunsunYoon/Editor-AI/1.0.0


# Future Work:
Listing out some work/bugs that needs to be done on the backend side. This would be nice to get started with the project.
1. Currently, the chatbot and the promotebot is not fully functional on deployment: Getting timeout error when deployed.
1. User auth Firebase is currently done on the frontend. For security and intuition, move the functionalities to the backend. Skeleton code is provided
1. We were not able to fully test the promotebot because we did not have the API keys, test these promotion functions.
1. To work/test on the chatbot/promotebot functions, make sure to uncomment the commented lines on the requirements.txt file.
1. COR origin policy origin routes are set to all routes (./flask_app/__init__.py), for security purposes, should change the origin routes only to the deployment frontend route.
1. Eat at Punjab Palace restaurant Allston, take group pic and post it to Slack (50 extra credit points).



# Contact Info
## Junsun (Lucas) Yoon:
### email: lyoon02@bu.edu

## Tia Hannah:
### email: thannah@bu.edu

## Benjamin Gardiner 
### email: bengard@bu.edu

## Mary Ann Nguyen
### email: nhnguyren@bu.edu