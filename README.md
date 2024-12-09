# Editor AI

Throughout Spring and Fall 2024, our teams have been building **Editor AI**. We look forward to its continued development, ensuring that hyperlocal journalists are equipped with the tools they need to produce high-quality content efficiently and effectively.

## Description
**Editor AI** is a text editor designed to assist journalists with AI-driven suggestions, helping them enhance their writing, streamline editing, and improve content quality. It addresses the challenges faced by hyperlocal journalists, who often work with limited resources, by enabling them to produce content at the speed and scale of larger media outlets while adhering to professional standards, including AP style formatting. Control remains entirely with the editorial staff, as the AI offers helpful suggestions that can be accepted, modified, or ignored, integrating seamlessly into their workflow.

## Key Features
- Detect and correct grammar and spelling
- Edit stories to comply with the AP style
- Suggest and generate headlines
- Propose new content ideas and sources that could improve an article
- Suggest and generate copy for social media posts

---

## Technical Architecture
![image](https://github.com/BU-Spark/se-editor-ai/blob/implemnting-ai-styles/technical_architecture.drawio%20(1).png?raw=true)

### Tech Stack
- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** Flask (Python)
- **Database:** Firebase
- **AI Development:** Hugging Face
- **Deployment:** Vercel, Railway
- **DevOps Tools:** Git

---

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:

### Running the Application Locally

#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd client/editor-ai/app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Alternatively, you can use:
   ```bash
   yarn dev
   pnpm dev
   bun dev
   ```

#### Backend
Refer to the [Backend Getting Started Guide](https://github.com/BU-Spark/se-editor-ai/tree/dev/backend#getting-started) for detailed instructions on setting up and running the backend.

### Deployment
To build the frontend for deployment, run:
```bash
npm run build
```

---

## Testing

### Backend
1. Install pytest:
   ```bash
   pip install pytest
   ```
2. Run backend unit tests:
   ```bash
   pytest
   ```

### Frontend
1. Navigate to the frontend test directory:
   ```bash
   cd client/editor-ai
   ```
2. Run tests with React Testing Library and Jest:
   ```bash
   npm test
   ```
   To run a specific test:
   ```bash
   npm test __tests__/filename.test.js
   ```

---

## Directory Structure
```
se-editor-ai/
├── backend/
│   ├── chatbot/
│   ├── env/
│   ├── flask_app/
│   └── tests/
├── client/
│   └── editor-ai/
│       ├── .firebase/
│       ├── public/
│       ├── app/
│       │   ├── admin/
│       │   ├── api/
│       │   ├── components/
│       │   ├── context/
│       │   ├── firebase/
│       │   ├── pages/
│       │   └── styles/
└── README.md
```

- ``backend/chatbot``: code for AI chatbot and suggestions
- ``backend/flask_app``: all application routes
- ``backend/tests``: unit tests for backend code
- ``client/editor-ai/app/api``: API calls for document handling, AI suggestions, and social media copy generation
- ``client/editor-ai/app/components``: reusable frontend components
- ``client/editor-ai/app/context``: user authentication logic
- ``client/editor-ai/app/firebase``: Firebase database connections
- ``client/editor-ai/app/pages``: frontend code for page structures
- ``client/editor-ai/app/styles``: styling for the frontend

---

## Known Bugs and Issues
- **Text Editor Page:** Page reload redirect users to the login page even if logged in. Document content does not save after applying suggestions if the user does not interact with the text editor afterward.
- **AI Features:** Certain features behave inconsistently. This is most likely an issue with the prompting or response format.
- **Promote Page:** There is an issue preventing the deployment of promotions from the promote page. Running ``npm run build`` will display the page without errors, but not during deployment.

---

## Future Work
- **Change AI Model**
- **Fix Existing Known Bugs and Issues**
- **Promote Page:** Finish promote page user functionality, such as social media integration.
- **Improve AI Features:** Implement functionality to refresh AI-generated suggestions, headlines, etc. to receive new and different outputs.
- **Migrate AI and API functionalities:** Move AI functionalities and related API calls to the backend for security and performance (refer to image suggestions implementation).
- **Migrate Authentication:** Move Firebase authentication to the backend for security and performance. 
- **Google Authentication:** Add Google login for easier user sign-in.
- **Update UI Styling:** Refresh login page, promote page, and profile page styling.

---

## Team (Fall 2024)

- **Justin Wang** - justin1@bu.edu
- **Vittori Huang** - vzh@bu.edu
- **Songming Fan** - songfan@bu.edu
