# InterviewIQ
1. `npm install`  2. `cp .env.example .env` and add `ANTHROPIC_API_KEY`  3. `npm run dev` (Vite on :5173, secure AI proxy on :5000).
The browser only talks to `/api/ai`; the key stays server-side. Data persists in localStorage via Redux Toolkit.

___________________________________________________________________________________________

The application should help users prepare for technical and HR interviews using AI-powered features. Build the application using ReactJS, JavaScript/ES6+, HTML5, CSS3, Bootstrap/Tailwind CSS, and integrate an AI API for intelligent interview assistance.

Key Features
AI-powered Interview Question Generator
Technical interview questions for ReactJS, JavaScript, HTML5, CSS3, Node.js, Next.js, Redux, TypeScript, REST APIs, GraphQL, etc.
HR and behavioral interview questions
AI-generated answers with explanations
Mock Interview mode with interactive AI conversation
User can submit answers and receive AI-based feedback
Interview Score & Performance Dashboard
Track strengths, weaknesses, accuracy, and progress
Question difficulty levels: Beginner, Intermediate, Advanced
Topic/category-based interview preparation
Real-time chat interface with AI interviewer
Timer for mock interviews
Interview history and performance tracking
Search, filter, and bookmark questions
Responsive design for desktop, tablet, and mobile
Modern cards, charts, animations, progress indicators, and interactive UI components
Clean, reusable, and scalable React component architecture
Technical Requirements
ReactJS with functional components and React Hooks
React Router for navigation
Redux Toolkit or Context API for state management
Axios/Fetch for API integration
AI API integration through a secure backend
Responsive UI using Bootstrap 5 or Tailwind CSS
Form validation and error handling
Loading states and user-friendly error messages
Modular folder structure following frontend best practices
Accessibility following WCAG 2.1 guidelines
Main Screens
Dashboard
AI Interview Setup
Technical Interview
HR Interview
AI Mock Interview
Interview Results
Performance Analytics
Question Bank
Bookmarked Questions
Interview History
User Profile & Settings

The final application should look like a production-ready AI interview platform, with a professional SaaS-style dashboard, intuitive navigation, smooth interactions, responsive layouts, and a polished user experience.