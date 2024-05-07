# Editor-AI: An AI integrated editing tool for hyperlocal journalists


## Table of Contents
1. [Description](#description)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)
6. [Contact](#contact)

# Setting up Flask environment



First, create virtual environment.
1. `pip install virtualenv`
2. `virtualenv venv`
3. `source venv/bin/activate` - to preface, this can be different from person to person

# Check requirements.txt for dependencies 

# To Run
1. Initiate googleCLI, put your service key in your secrets folder
1. Navigate to /backend/app
1. run python3 -m flask_app

# Files

1. routes
    Contains all the route info for the API

1. services
    Takes care of all the backend services (external API, firestore database, authentication)

1. utils
    Utility functions/classes that act as helper functions


# API Documentation link:
https://app.swaggerhub.com/apis-docs/JunsunYoon/Editor-AI/1.0.0