
# Editor AI

Throughout the spring 2024 semester, our team has been building EditorAI. We hope work continues on this project in the future so that hyperlocal journalists are best equipt with tools to create high quality content.

## Description: 
A project aimed at aiding hyper-local news sites. This tool is meant to assist busy editors who are often working solo or with a limited staff producing news. Control should always rest with the editorial staff. The bot should make helpful suggestions that the staff can either accept or reject and to should fit comfortably into their workflow.

## This chatbot is designed to: 
Detect and correct grammar and spelling
Edit stories to comply with the AP style
Suggest and generate headlines
Propose new content ideas and sources that could improve an article. 
Suggest and generate copy for social media posts.


## Project Technical Architecture ##
![image](https://github.com/BU-Spark/se-editor-ai/blob/implemnting-ai-styles/technical_architecture.drawio%20(1).png?raw=true)

### Tech stack ###

- Frontend: Next.js, Tailwind CSS, Typescript
- Backend: Python (Flask)
- Database: Firebase
- AI Development: Hugging Face, Gemma
- Deployment: Vercel & Railway
- DevOps Tools: Git

# Instructions on Getting Started #

Before starting, need to be installed.

## How to Run ##

Frontend: Navigate to ```\client\editor-ai\app```

Install dependencies with command:
```bash
npm install
```

Running application locally with command:
```bash
npm run dev
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Deploying application locally with command:
```bash
npm run build 
```

## Testing ##

Unit tests on the backend.

Install pytest with following commands:
```bash
pip install pytest
```

To run the tests on the backend, execute the following commands:

```bash
pytest
```


Unit tests on the front end were created with the React Testing Library and Jest Library.

To run the tests on the frontend, navigate to ```\client\editor-ai``` and execute the following command:
```bash
npm test
```

To run a specific test:
```bash
npm test __tests__/filename.test.js
```

## Project Directory Structure ##

This is the general project directory structure for Editor AI:

se-editor-ai
   * backend
       - chatbot
       - env
       - flask_app
       - tests
   * client
      - editor-ai
         - .firebase
         - public
         - app
            -  admin
            -  api
            -  components
            -  context
            -  firebase
            -  pages
            -  styles
          
Refer to the README.md in```client/backend ```for more detailed documentation. 
    
- ```/backend/chatbot ``` contains the code for chat bot and ai suggestions

- ```/client/editor-ai/app/api ``` contains the api calls made for handling documents, ai suggestions, and social media copies
  
- ```/client/editor-ai/app/components ``` contains the resusable components used in the application
  
- ```/client/editor-ai/app/context ``` contains code for user authentication
  
- ```/client/editor-ai/app/firebase ``` contains firebase database connections hosted on Railway
  
- ```/client/editor-ai/app/pages ``` contains frontend code for all the pages
  
- ```/client/editor-ai/app/styles ``` contains all the styles used in the frontend
  
- ```/client/editor-ai/backend/chatbot ``` contains code for ai suggestions and chat bot
  
- ```/client/editor-ai/backend/flask_app ``` contains all routes for application
  
- ```/client/editor-ai/backend/tests ``` contains unit tests for backend
  
## Known Bugs and Issues ##

- Main Page: Reloading the main page multiple times occasionally redirects users to the login page. The page also will sometime refresh to the login page even though the user is signed in and the login page includes the header with the user's email which is a bug we did not fix in time. 
  
- Text Editor Page: Certain functionalities on the text editor page are experiencing unclear interactions and may behave inconsistently. This is specifically for 4 options that are first displayed when redirected to text editor page.
  
- Promote Page: There is an issue preventing the deployment of promotions from the promote page. Running ```npm run build ``` will display the page without errors, but not during deployment.

- Components: We first modeled the frontend display after the figma high fidelity frames, but because there were unclear UX designs that redirected us to redesigning some of the user interactions. There are a few components that are made to replicate the styling and user interaction provided on the high fidelity frames. However, because we redesigned it without communicating with the UX team, the components remain there for future work.
  
## Status ##

- Login Page and Sign up Page: User can create an account through an email and password or sign in with a previously created account.
- Home Page: All previously created project items are displayed here along with the option to create a new document, upload a local document, promote articles, and query previously created documents. There are 5 main features: Create Document button, Upload Document button, Promote Article button, search bar, and Project items. There is a promote article option that was suggested by the client. The promota article requires a document input to generate a social media copy. but currently does not have a input article selection before redirecting to the promote articles page with the social media copy. The user can create a document by selecting 'Create Document' component which will provide a pop up for the user to enter the new document's title or to cancel and exit out. Selecting an existing project item will pop up two selections of 'edit an article' and 'promote an article' which will either redirect to the text editor page or the promote articles page.
- Text Editor Page: This page displays the newly created or pre-existing project item (document). The user is provided suggestions where AI suggestions are prompted to assist the user on editing their document. After selecting an option, AI suggestions will pop up that allow the user to apply the suggestion, completly ignore the suggestion, or select an option for talking to a AI chat bot. The AI chatbot does not directly use the AI suggestions, but the user can use the chat bot to ask questions about how to edit their document. The first provided suggestions, AI suggestions, and AI chat bot are all accessible to the users through buttons that will display or hide these three features. 
- Promote Articles Page: Given a project item (document), a social media copy can be generated on this page with links (currently not working) to social media platforms such as Twitter and Facebook. User is given the option to redirect back to the currently working project item.  
- Profile Page: Contains basic user information such as email and password. The user can update their password on this page.

## Future Work ##

- Text Editor Page and Home Page: Functionalities can be redesiged for the user experience to enhance user interaction on the text editor page and home page.
  
- Database: Additional user information can be stored in the database to provide more comprehensive user profiles.
  
- Promote Articles Page: Integrate the promote articles page with social media platforms to streamline content sharing.
  
- Text Editor Suggestions: Implement context-aware suggestions within the text editor to assist users in creating content more efficiently.
  
- Integration with External Services: Google Docs and Wordpress for content mangament could be integrated into Editor AI.

- Authentication: Adding Google authentication to streamline the login process and enhance security.

- Database: Authenticating users in the front end instead of backend. 

- AI Development: Connecting the chat bot and ai suggestions from the backend instead of using Hugging Face models in the front end.

- Deployment: Transfer all deployment to Railway from Vercel.
