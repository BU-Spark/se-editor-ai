# Project Overview Description # 

Editor Ai is the all-in-one AI powered editing tool that accelerates and improves editing workflow for hyperlocal journalists. It aims to provide AI powered suggestions and an AI Chat Bot, correct grammer and syntax, and offer AP Style Book writing formating. The targeted users are hyperlocal journalists who want an efficient and easy workflow for creating, editing, and promoting their articles on different platforms.

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

## Prerequisites and Configuration ##



## How to Run ##

Frontend: Navigate to ```\client\editor-ai\app```

```bash
npm install
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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Testing ##




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
    
  
- ```/client/editor-ai/app/api ``` contains the api calls made for handling documents, ai suggestions, and social media copies
  
- ```/client/editor-ai/app/components ``` contains the resusable components used in the application
  
- ```/client/editor-ai/app/context ``` contains code for user authentication
  
- ```/client/editor-ai/app/firebase ``` contains firebase database connections hosted on Railway
  
- ```/client/editor-ai/app/pages ``` contains frontend code for all the pages
  
- ```/client/editor-ai/app/styles ``` contains all the styles used in the frontend
  
- ```/client/editor-ai/backend/chatbot ``` contains code for ai suggestions and chat bot
  
- ```/client/editor-ai/backend/flask_app ``` contains all routes for application
  
- ```/client/editor-ai/backend/tests ``` contains unit tests for backend
  
## Known Bugs/ Issues ##

- Main Page: Reloading the main page multiple times occasionally redirects users to the login page.
  
- Text Editor Page: Certain functionalities on the text editor page are experiencing unclear interactions and may behave inconsistently.
  
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
  
- Promote Articles Page: Future updates will integrate the promote articles page with social media platforms to streamline content sharing.
  
- Text Editor Suggestions: We aim to implement context-aware suggestions within the text editor to assist users in creating content more efficiently.
  
- Integration with External Services: Google Docsa and Wordpress for content mangament could be integrated iinto Editor AI.

- Authentication: Adding Google authentication to streamline the login process and enhance security.

