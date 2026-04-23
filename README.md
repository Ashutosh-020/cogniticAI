# Cognitic

Cognitic is a centralized AI-powered meeting assistant platform designed to automate note-taking, summarize discussions, extract action items, and make all your meeting history semantically searchable. By joining your online meetings (Zoom, Google Meet, Teams), Cognitic processes real-time audio transcripts utilizing Google Gemini's advanced LLMs and Pinecone vector databases. It keeps your team in sync by deeply integrating with your favorite tools like Slack, Notion, and Google Calendar.

Built for high performance and scalability on a modern tech stack encompassing Next.js 16, React 19, and Neon Serverless PostgreSQL.

---

## Features

**🤖 Automated Meeting Assistant**  
Automatic AI bot deployment to Zoom, Google Meet, and Microsoft Teams to record and transcribe.

**📝 Transcription & Analysis**  
Meeting transcription with speaker identification and diarization.  
AI-generated meeting summaries and action items using Google Gemini AI.  

**🧠 Advanced Search & Chat**  
Chat with meeting conversational AI via a RAG pipeline powered by a Pinecone vector database.  
Semantic search across all meeting transcripts and summaries.  
Global chat feature to query across all meetings simultaneously.  
Individual meeting chat interface for meeting-specific conversations.  

**📅 Productivity Integrations**  
Real-time calendar sync with Google Calendar.  
One-click action item sync to project management tools like Notion and Trello.  
Native Slack bot integration with `@meetingbot` commands using the Slack Bolt framework.  

**⚙️ Platform & UX**  
Comprehensive meeting dashboard with audio playback using React H5 Audio Player.  
Complete meeting history with clickable past meeting navigation.  
Upcoming meetings dashboard with toggle controls for bot attendance.  
Modern, highly-responsive UI built with Next.js 16, Tailwind CSS 4, shadcn/ui, and Framer Motion.  
Dark theme support using Next Themes.  
Real-time notifications using Sonner toast system.  

**🌍 Enterprise Management**  
Three-tier subscription system with Stripe payment processing and webhook handling.  
Secure user authentication and session management with Clerk.  
AWS Lambda functions for automated bot scheduling.  
Enterprise-grade security with proper webhook validation using Svix.  
AWS S3 storage for audio files, transcript chunks, and user profile images.  
Automated post-meeting email notifications using Resend integration.  
Efficient, strongly-typed Postgres database management leveraging NeonDB and Prisma ORM.

---

## Technologies and Frameworks

- **Next.js 16** & **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** & **Framer Motion**
- **Clerk Auth**
- **Prisma ORM** & **Neon (Serverless PostgreSQL)**
- **AWS SDK** (S3 Storage)
- **AWS Lambda** & **EventBridge** (Bot Scheduling)
- **Google Gemini AI API** (LLM Summarization & Entity Extraction)
- **Pinecone Vector Database** (RAG / AI Chat)
- **Stripe** (Billing & Subscriptions)
- **Slack Bolt Framework**
- **Resend** & **Nodemailer**
- **Svix** (Webhook validation)
- **React H5 Audio Player**
- **Sonner** (Toasts)
- **Next Themes**

---

## Upcoming Features

### Integrations 🔗
- Notion Integration (Enhanced Syncing)
- Linear Integration
- Salesforce Integration
- Hubspot Integration

### Past Meetings Upgrades 🕰️
- Advanced user meeting search operations
- Date-based filtering (ex: March 17 to April 1)
- Custom date ranges filtering (ex: last week, last month, last quarter)
- Meeting duration filtering (ex: less than 30 mins)
- Participant-based filtering
- **100+ Languages Transcript Translation:** Similar to what fireflies.ai does, users will be able to view their transcripts in over 100 languages. They can go to a dropdown menu and change their transcript language seamlessly using the Google Cloud Translation API.

### Workspaces Creation 🏢
- Users can create customized, isolated workspaces
- Users can invite team members and other people to their workspace
- Role-based access control (Admin, Member, Viewer, etc.)
