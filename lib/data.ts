// Define types for your data
export type SkillCategory =
  | 'Language'
  | 'Framework/Library'
  | 'Database'
  | 'API/Protocol'
  | 'Cloud/DevOps'
  | 'Core Stack'
  | 'Development Environment'
  | 'Communication'
  | 'Tool'
export interface Skill {
  name: string;
  filterCategories: string[];
  description?: string;
  // Optional: proficiency: number; // 1-5 or similar
}

export interface CarouselImage {
  src: string;    // Path to the image in /public/images/project-slug/...
  alt: string;
  caption?: string; // Optional caption for each image
}

export interface Project {
  id: string;
  title: string;
  slug: string; // for URL
  year?: string; // Display year, e.g. "2026" — used as marginalia on cards & detail
  pullQuote?: string; // Optional one-line editorial pull-quote shown on the case-study page
  shortDescription: string;
  tags: string[]; // e.g., ["Next.js", "Supabase", "API Design"]
  imageUrl?: string; // Optional image for the card
  carouselImages?: CarouselImage[];
  // For detailed page
  longDescription: string;
  myRole: string;
  myRoles?: string[];
  backendFeatures: string[];
  frontendFeatures?: string[];
  challengesAndSolutions: { challenge: string; solution: string }[];
  architectureDiagramUrl?: string; // Path to diagram in /public
  githubUrl?: string;
  liveDemoUrl?: string;
  techStack: string[]; // Full tech stack list
  classDiagramUrl?: string;
  erdUrl?: string;
}

export const skillsData: Skill[] = [
  { name: "TypeScript", filterCategories: ["all", "core", "language", "frontend"] },
  { name: "JavaScript", filterCategories: ["all", "core", "language", "frontend"] },
  { name: "Node.js", filterCategories: ["all", "core", "backend"] },
  { name: "Dart", filterCategories: ["all", "core", "language"] },
  { name: "React", filterCategories: ["all", "core", "framework/library", "frontend"] },
  { name: "Next.js", filterCategories: ["all", "core", "framework/library", "frontend"] },
  { name: "Tailwind CSS", filterCategories: ["all", "core", "frontend", "framework/library", "css"] },
  { name: "Express.js", filterCategories: ["all", "core", "framework/library", "backend"] },
  { name: "Flutter", filterCategories: ["all", "core", "framework/library", "frontend"] },
  { name: "GraphQL", filterCategories: ["all", "api/protocol", "framework/library", "backend"] },
  { name: "C", filterCategories: ["all", "core", "language"] },
  { name: "C++", filterCategories: ["all", "core", "language"] },
  { name: "C#", filterCategories: ["all", "core", "language", "backend"] },
  { name: "Swift", filterCategories: ["all", "core", "language"] },
  { name: "Python", filterCategories: ["all", "core", "language", "backend"] },
  { name: "HTML5", filterCategories: ["all", "language", "frontend"] },
  { name: "CSS3", filterCategories: ["all", "frontend", "language", "css"] },
  { name: "Supabase", filterCategories: ["all", "core", "database", "backend", "cloud", "environment"] },
  { name: "MySQL", filterCategories: ["all", "core", "database", "cloud"] },
  { name: "Firebase", filterCategories: ["all", "core", "database", "backend", "cloud", "environment"] },
  { name: "REST APIs", filterCategories: ["all", "api/protocol", 'backend'] },
  { name: "Git & GitHub", filterCategories: ["all", "core", "tool", "environment"], description: "Version Control" },
  { name: "Jira", filterCategories: ["all", "core", "tool"], description: "Task Tracking & Project Management" },
  { name: "VS Code", filterCategories: ["all", "core", "environment"], description: "Primary Code Editor" },
  { name: "Android Studio", filterCategories: ["all", "core", "environment", "tool"], description: "Android Emulator" },
  { name: "Docker", filterCategories: ["all", "cloud", "cloud/devops", "tool", "environment"] },
  { name: "Discord", filterCategories: ["all", "core", "communication", "tool"], description: "Team & Community Chat" },
  { name: "Google Meet", filterCategories: ["all", "core", "communication", "tool"], description: "Video Conferencing" },
  { name: "Microsoft Teams", filterCategories: ["all", "core", "communication", "tool"], description: "Team Collaboration & Meetings" },
  { name: "Facebook Messenger", filterCategories: ["all", "core", "communication", "tool"], description: "Informal Team Communication" },
  { name: "MSAccess", filterCategories: ["all", "database", "environment"] },
  // Backend & Database (from FutureThink Edge)
  { name: "FastAPI", filterCategories: ["all", "core", "framework/library", "backend"], description: "Python Web Framework" },
  { name: "SQLAlchemy", filterCategories: ["all", "core", "database", "backend"], description: "Python ORM" },
  { name: "PostgreSQL", filterCategories: ["all", "core", "database", "backend", "cloud"] },
  { name: "Redis", filterCategories: ["all", "core", "database", "backend", "cloud"], description: "Caching & Session Store" },
  { name: "JWT Auth", filterCategories: ["all", "api/protocol", "backend"], description: "Token-based Authentication" },
  { name: "WebSocket", filterCategories: ["all", "api/protocol", "backend"], description: "Real-time Communication" },
  // AI/ML Integration
  { name: "OpenAI API", filterCategories: ["all", "api/protocol", "backend", "cloud"], description: "LLM Integration" },
  { name: "Groq API", filterCategories: ["all", "api/protocol", "backend", "cloud"], description: "Fast AI Inference" },
  // DevOps & Deployment
  { name: "Render", filterCategories: ["all", "cloud", "cloud/devops", "environment"], description: "Full-Stack Deployment" },
  // ASP.NET Core Stack (from Book Buddi)
  { name: "ASP.NET Core", filterCategories: ["all", "core", "framework/library", "backend"], description: "C# Web Framework" },
  { name: "SQL Server", filterCategories: ["all", "core", "database", "backend"], description: "Microsoft RDBMS" },
  { name: "AutoMapper", filterCategories: ["all", "tool", "backend"], description: "Object-to-Object Mapping" },
  // Additional Skills (AI.pollo)
  { name: "Vite", filterCategories: ["all", "tool", "frontend"], description: "Next Generation Frontend Tooling" },
  { name: "Framer Motion", filterCategories: ["all", "framework/library", "frontend"], description: "Production-ready Animation Library" },
  { name: "Spotipy", filterCategories: ["all", "framework/library", "backend"], description: "Python library for the Spotify Web API" },
  { name: "Spotify API", filterCategories: ["all", "api/protocol", "backend"], description: "Music Data & OAuth" },
  // Additional Skills (SchemaFlow)
  { name: "React Flow", filterCategories: ["all", "framework/library", "frontend"], description: "Node-based UI framework" },
  { name: "Zustand", filterCategories: ["all", "framework/library", "frontend"], description: "Lightweight State Management" },
  { name: "Zod", filterCategories: ["all", "tool", "frontend", "backend"], description: "TypeScript-first schema validation" },
  // LaChowOS Stack
  { name: "NestJS", filterCategories: ["all", "core", "framework/library", "backend"], description: "Progressive Node.js Framework" },
  { name: "Prisma", filterCategories: ["all", "core", "database", "backend"], description: "Next-gen Node.js ORM" },
  { name: "Clerk", filterCategories: ["all", "api/protocol", "backend", "frontend"], description: "Authentication & User Management" },
  { name: "Stripe", filterCategories: ["all", "api/protocol", "backend"], description: "Payment Processing" },
  { name: "AWS S3", filterCategories: ["all", "cloud", "cloud/devops", "backend"], description: "Cloud Object Storage" },
  { name: "SendGrid", filterCategories: ["all", "api/protocol", "backend"], description: "Email Delivery Service" },
  { name: "DocuSign", filterCategories: ["all", "api/protocol", "backend"], description: "eSignature Integration" },
  { name: "Socket.IO", filterCategories: ["all", "api/protocol", "backend", "frontend"], description: "Real-time Bidirectional Communication" },
  { name: "Turborepo", filterCategories: ["all", "tool", "cloud/devops"], description: "High-performance Monorepo Build System" },
  { name: "pnpm", filterCategories: ["all", "tool", "environment"], description: "Fast, Disk-efficient Package Manager" },
  { name: "Sentry", filterCategories: ["all", "tool", "cloud/devops"], description: "Error Monitoring & Performance Tracking" },
  { name: "shadcn/ui", filterCategories: ["all", "framework/library", "frontend"], description: "Accessible UI Component Library" },
  { name: "React Query", filterCategories: ["all", "framework/library", "frontend"], description: "Server State Management" },
  { name: "FullCalendar", filterCategories: ["all", "framework/library", "frontend"], description: "Interactive Calendar Component" },
  { name: "Recharts", filterCategories: ["all", "framework/library", "frontend"], description: "React Charting Library" },
];

export const projectsData: Project[] = [
  {
    id: "0",
    slug: "ai-pollo-mood-playlist",
    year: "2025",
    title: "AI.pollo - AI Mood Playlist Recommender",
    shortDescription: "An AI-powered mood-based music playlist recommender using the Spotify API. Built with a React/Vite frontend and a FastAPI backend.",
    imageUrl: "/images/apollo_login.jpg",
    carouselImages: [
      { src: "/images/apollo_login.jpg", alt: "Spotify Login", caption: "Secure OAuth 2.0 flow with Spotify integration." },
      { src: "/images/apollo_dashboard.jpg", alt: "User Dashboard", caption: "Personalized tracks based on mood and audio features." },
      { src: "/images/apollo_mood_detection.jpg", alt: "Mood Detection Interface", caption: "Text-based sentiment analysis or manual emotion selection." },
    ],
    tags: ["React", "FastAPI", "Python", "Spotify API", "Tailwind CSS"],
    longDescription: "AI.pollo is an AI-powered mood-based music playlist recommender that analyzes user moods manually or via text input and generates personalized Spotify recommendations based on listening history and mood profiles. It uses a curated scoring algorithm on tracks' audio features (valence, energy, tempo, danceability) to ensure optimal song matching.",
    myRole: "Full-Stack Developer",
    techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "Python", "FastAPI", "Spotipy", "Spotify OAuth 2.0"],
    backendFeatures: [
      "Spotify OAuth 2.0 flow for secure access and refresh token management.",
      "Integration with Spotify API to fetch a user's profile, top tracks, and audio features.",
      "Recommendation engine mapping moods to specific Spotify audio feature constraints (valence, energy, tempo).",
      "Dynamic scoring algorithm that sorts and filters a user's top tracks against the detected mood profile.",
      "Text-based sentiment analysis endpoint for mood detection from user prompts."
    ],
    frontendFeatures: [
      "Rich interactive dashboard using a premium, responsive glassmorphic design.",
      "Smooth micro-animations and page transitions using Framer Motion.",
      "Manual mood selector mapped to specific colors and an intuitive text input interface for sentiment analysis.",
      "Global state management for handling asynchronous Spotify API calls and authentication status."
    ],
    challengesAndSolutions: [
      {
        challenge: "Mapping abstract moods securely to concrete Spotify audio features.",
        solution: "Developed scoring logic that dynamically weighs variables like valence, energy, tempo, and danceability to accurately represent different emotional profiles."
      },
      {
        challenge: "Managing Spotify's strict OAuth 2.0 token refreshes securely.",
        solution: "Handled the authentication flow entirely in the FastAPI backend, storing tokens securely via cookies and bridging them to the frontend context."
      },
      {
        challenge: "Creating a visually cohesive music platform theme.",
        solution: "Implemented a fully dynamic glassmorphic interface with vibrant neon accents and Framer Motion micro-interactions that elevate the perceived brand quality."
      }
    ],
    githubUrl: "https://github.com/Erudi787/apollo",
    liveDemoUrl: "https://ai-pollo.vercel.app",
  },
  {
    id: "1",
    slug: "futurethink-edge",
    year: "2025",
    pullQuote: "Built for students whose attention isn't always available — adaptive AI across three providers, engineered for 3,000+ concurrent users, FERPA-grade audit logs.",
    title: "FutureThink Edge - AI-Powered Adaptive Learning Platform",
    shortDescription: "A production EdTech platform for students with ADHD and learning differences, featuring AI-powered adaptive learning, multi-role portals, and real-time collaboration.",
    imageUrl: "/images/futurethink-thumbnail.png",
    carouselImages: [
      { src: "/images/futurethink_dashboard.png", alt: "Student Dashboard", caption: "Personalized student dashboard with progress tracking." },
      { src: "/images/futurethink_classroom.png", alt: "AI Classroom", caption: "AI-powered interactive learning classroom." },
      { src: "/images/futurethink_braingym.png", alt: "Brain Gym", caption: "Gamified brain training exercises." },
    ],
    tags: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "OpenAI API", "WebSocket", "TypeScript", "Python"],
    longDescription: "FutureThink Edge is a comprehensive AI-powered adaptive learning platform specifically designed for students with ADHD and learning differences. The platform is engineered for 3,000+ concurrent users across multiple roles (Students, Teachers, Parents, Admins, Organizations) with features including AI-powered tutoring, real-time collaboration, gamification, mental health monitoring, and advanced analytics. Fully deployed on Render with PostgreSQL database and Redis caching.",
    myRole: "Junior Full-Stack Developer",
    myRoles: [
      "Backend Developer",
      "Database Administrator",
      "DevOps Engineer",
      "AI Integration Specialist",
    ],
    techStack: ["FastAPI", "Python", "Next.js 15.3", "TypeScript", "PostgreSQL", "SQLAlchemy ORM", "Redis", "OpenAI API", "Groq API", "WebSocket", "JWT Auth", "Render", "Sentry", "Tailwind CSS"],
    backendFeatures: [
      "Built 40+ RESTful API endpoints using FastAPI handling authentication, learning sessions, analytics, and admin functions.",
      "Designed and implemented 42+ database models with SQLAlchemy ORM supporting complex role-based relationships.",
      "Developed JWT authentication system with role-based access control (RBAC) for 5 user types (Student, Teacher, Parent, Admin, Organization).",
      "Implemented Redis caching strategy with connection pooling (pool size: 20, max overflow: 40) sized for 3,000+ concurrent users.",
      "Created WebSocket server with room-based broadcasting for real-time collaboration and notifications.",
      "Built 25+ database migration scripts ensuring zero-downtime production deployments.",
      "Integrated 3 AI providers (OpenAI, Groq, Google Gemini) with orchestration layer for optimal performance.",
      "Developed audit logging system for FERPA, COPPA, and GDPR compliance.",
      "Created rate limiting and security measures preventing account enumeration and brute-force attacks.",
    ],
    frontendFeatures: [
      "Integrated backend APIs with existing Next.js 15.3 frontend components using TypeScript.",
      "Connected database endpoints to UI components for seamless data flow and state management.",
      "Adjusted UI/UX elements using Tailwind CSS v4 to improve user experience and visual consistency.",
      "Modified existing React hooks and components to support new backend functionality.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Engineering for 3,000+ concurrent users without performance degradation.",
        solution: "Implemented Redis caching with multiple cache layers (SmartCache, AnalyticsCache, AICache), configured database connection pooling with pool size of 20 and max overflow of 40, and optimized database queries."
      },
      {
        challenge: "Managing complex role-based access across 5 different user types with varying permissions.",
        solution: "Designed a comprehensive RBAC system with JWT tokens, middleware-based permission checks, and database-level row security for sensitive data."
      },
      {
        challenge: "Integrating multiple AI providers while maintaining consistent response quality.",
        solution: "Built an AI orchestration layer that dynamically selects providers based on availability, cost, and latency. Optimized LLM prompts for the AI Classroom to improve student engagement."
      },
      {
        challenge: "Ensuring zero-downtime deployments with database schema changes.",
        solution: "Created 25+ incremental migration scripts with rollback capabilities, tested migrations in staging environment before production deployment."
      },
      {
        challenge: "Real-time collaboration features across multiple user sessions.",
        solution: "Implemented WebSocket server with room-based broadcasting, allowing targeted notifications and live updates without overwhelming the server."
      }
    ],
    liveDemoUrl: "https://www.futurethinkedge.org",
  },
  {
    id: "2",
    slug: "bsdoc-health-platform",
    year: "2024",
    title: "BSDOC - Personal Health Management Platform",
    shortDescription: "A comprehensive platform for health record management, OTC suggestions, and doctor appointments.",
    imageUrl: "/images/bsdoc-thumbnail.jpg",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS", "API Design", "Auth"],
    longDescription: "BSDOC is a multifaceted health management system designed to empower users with tools for personal health tracking, symptom analysis for over-the-counter medication suggestions, and a seamless interface for scheduling and managing doctor appointments. The platform serves distinct roles for general users (patients), doctors, and administrators.",
    myRole: "Team Leader",
    myRoles: [
      "Project Manager",
      "Backend Developer",
      "Database Administrator",
    ],
    techStack: ["Next.js (API Routes)", "Supabase (PostgreSQL, Auth, Storage, Realtime)", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Github"],
    backendFeatures: [
      "Secure user authentication (email/password, OAuth) and role-based access control (RBAC).",
      "RESTful API development for CRUD operations on profiles, medical records, appointments, etc.",
      "Database schema design and management using Supabase (PostgreSQL).",
      "Real-time notification system for appointment updates and verifications.",
      "Backend logic for doctor verification workflow, including secure file uploads for PRC IDs.",
      "Admin panel APIs for user management, content management, and platform analytics.",
      "Integration with an external AI service for symptom analysis (conceptual for this project example).",
    ],
    challengesAndSolutions: [
      {
        challenge: "Implementing a robust and secure multi-tenant authentication and authorization system for varying user roles (patients, doctors, admins).",
        solution: "Utilized Supabase Authentication for user management and JWT handling. Implemented role checks in Next.js middleware for route protection and leveraged Supabase Row Level Security (RLS) policies to enforce data access restrictions at the database level."
      },
      {
        challenge: "Designing a scalable system for managing doctor availability and appointment bookings, preventing conflicts.",
        solution: "Developed API endpoints for doctors to define their availability slots. Implemented transactional logic (or careful sequencing of operations) for booking appointments to ensure that a time slot is confirmed only if available, reducing the likelihood of double bookings."
      }
    ],
    architectureDiagramUrl: "/images/project-bsdoc-architecture.png",
    githubUrl: "https://github.com/mantequilla45/bsdoc",
    liveDemoUrl: "https://bsdoc-project.vercel.app"
  },
  {
    id: "3",
    slug: "schemaflow",
    year: "2025",
    title: "SchemaFlow - Interactive Schema Visualizer",
    shortDescription: "An interactive visualizer that turns SQL DDL and JSON payloads into live ERD diagrams using React Flow.",
    imageUrl: "/images/schemaflow_thumbnail.png",
    carouselImages: [
      { src: "/images/schemaflow_editor.png", alt: "SchemaFlow Editor", caption: "SQL/JSON input editor with instant visualization." },
      { src: "/images/schemaflow_canvas.png", alt: "Interactive Canvas", caption: "Interactive React Flow canvas with Dagre auto-layout." },
      { src: "/images/schemaflow_customization.png", alt: "Node Customization", caption: "Custom color palettes and multi-theming engine." },
    ],
    tags: ["React", "TypeScript", "React Flow", "Tailwind CSS", "Zustand"],
    longDescription: "SchemaFlow is an interactive schema visualizer that seamlessly turns SQL DDL statements and JSON payloads into live Entity Relationship Diagrams (ERD) and nested object structure diagrams. Powered by React Flow and Dagre, it dynamically lays out highly complex connections, drawing edges specifically from field-to-field rather than node-to-node, giving developers an instant visual map of their database schemas.",
    myRole: "Frontend Developer",
    techStack: ["React", "Vite", "TypeScript", "React Flow", "TailwindCSS", "CodeMirror 6", "Zustand", "Zod", "Dagre", "Lucide React"],
    backendFeatures: [],
    frontendFeatures: [
      "Dynamic parsing of SQL `CREATE TABLE` / `ALTER TABLE` statements and complex JSON API responses.",
      "Field-level edge connections perfectly mapping relationships such as foreign keys.",
      "Robust Dagre layout physics gracefully handling self-referencing relationships.",
      "Custom node palettes, multi-theming engine, and full undo/redo canvas history via Zustand.",
      "Native bounding-box image export (PNG, JPEG, SVG) of the generated visual graph.",
      "Drag & drop upload functionality for .sql and .json files with auto-mode switching.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Silently failing edges due to mismatched Handle IDs in React Flow.",
        solution: "Identified uppercase resolution issues in the SQL parser and ensured all dynamically generated target/source node handles corresponded perfectly with parsed edge references."
      },
      {
        challenge: "Algorithm failures on Dagre when users established self-referential connections (Cyclic Graphs).",
        solution: "Passed greedy acyclic modes into Dagre's physics engine to prevent layout crashes, allowing graph computations to proceed safely."
      },
      {
        challenge: "Saving custom user configurations and non-standard graph states across sessions.",
        solution: "Created derived data serialization in Zustand, binding user palettes and graph configurations safely into localStorage."
      }
    ],
    githubUrl: "https://github.com/Erudi787/schemaflow",
    liveDemoUrl: "https://schemaflow-pi.vercel.app"
  },
  {
    id: "4",
    slug: "book-buddi",
    year: "2024",
    title: "Book Buddi - Library Management System",
    shortDescription: "A comprehensive web-based Library Management and Book Catalogue System built with ASP.NET Core and Razor Pages, featuring clean 3-tier architecture.",
    imageUrl: "/images/bookbuddi-thumbnail.png",
    carouselImages: [
      { src: "/images/bookbuddi_catalogue.png", alt: "Book Catalogue", caption: "Browse comprehensive book information with detailed metadata." },
      { src: "/images/bookbuddi_admin.png", alt: "Admin Panel", caption: "Secure admin panel for catalogue management." },
      { src: "/images/bookbuddi_reports.png", alt: "Reports Module", caption: "Comprehensive reporting for borrowing activity and inventory." },
    ],
    tags: ["ASP.NET Core", "C#", "SQL Server", "Entity Framework", "Razor Pages", "Clean Architecture"],
    longDescription: "Book Buddi is a comprehensive web-based Library Management System designed for both general users and administrators. It provides a complete solution for library operations including book cataloguing, borrowing management, notifications, and comprehensive reporting. Built using ASP.NET Core 9.0 with a clean 3-tier N-layer architecture following the ASI (Abstraction-Service-Interface) pattern.",
    myRole: "Team Leader",
    myRoles: [
      "Project Manager",
      "Backend Developer",
      "Database Administrator",
    ],
    techStack: ["ASP.NET Core 9.0", "C#", "Razor Pages", "Entity Framework Core 9.0", "SQL Server", "AutoMapper", "Identity Authentication", "Repository Pattern", "Unit of Work Pattern"],
    backendFeatures: [
      "Clean 3-tier N-layer architecture following ASI (Abstraction-Service-Interface) pattern.",
      "Repository Pattern and Unit of Work Pattern for data access abstraction and transaction management.",
      "Entity Framework Core 9.0 with migration-based schema management.",
      "ASP.NET Core Identity for secure authentication with role-based access control (Admin/Member).",
      "AutoMapper for clean object-to-object mapping between entities and DTOs.",
      "Comprehensive audit trail system tracking CreatedBy, CreatedTime, UpdatedBy, UpdatedTime.",
      "RESTful API design for CRUD operations on books, members, and borrowing records.",
      "Reporting module with borrowing activity, inventory, member reports, and lost books tracking.",
      "Notification system for book request updates, due date reminders, and overdue alerts.",
    ],
    frontendFeatures: [
      "Razor Pages for server-side rendered UI with clean separation of concerns.",
      "Advanced search functionality for quick book discovery.",
      "Secure admin panel with authentication-protected routes.",
      "Book catalogue management interface (list, add, edit, delete).",
      "User-friendly borrowing and return workflow.",
      "Notification dropdown panel and dedicated notifications page.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Implementing a scalable and maintainable architecture for a growing library system.",
        solution: "Adopted clean 3-tier N-layer architecture with Repository and Unit of Work patterns, ensuring separation of concerns and easy testability."
      },
      {
        challenge: "Managing complex database relationships between books, members, borrowing records, and notifications.",
        solution: "Used Entity Framework Core with Fluent API configurations for precise relationship mapping and migration-based schema management."
      },
      {
        challenge: "Ensuring data integrity and tracking changes for audit compliance.",
        solution: "Implemented comprehensive audit trail pattern with automatic tracking of CreatedBy, CreatedTime, UpdatedBy, and UpdatedTime on all entities."
      },
      {
        challenge: "Coordinating team development with multiple contributors working on different features.",
        solution: "Established Gitflow-inspired workflow with feature branches, pull request reviews, and clear commit guidelines for accountability."
      },
    ],
    githubUrl: "https://github.com/Erudi787/book-buddi",
  },
  {
    id: "5",
    slug: "sync-task-collaboration",
    year: "2023",
    title: "Sync() – Personal Task and Collaboration Web App",
    shortDescription: "A centralized web platform for managing personal tasks, collaborating with colleagues, and maintaining customizable user profiles.",
    imageUrl: "/images/sync_landing.png",
    carouselImages: [
      { src: "/images/sync_landing.png", alt: "Landing Page View", caption: "Login/Registration Modals." },
      { src: "/images/sync_about.png", alt: "About Page View", caption: "What The Project is About." },
      { src: "/images/sync_home.png", alt: "Home Page View", caption: "Home Page With Projects." },
      { src: "/images/sync_account.png", alt: "User Account Page View", caption: "User can view/edit their details." },
      { src: "/images/sync_taskmanager.png", alt: "Task Manager Page View", caption: "Task Manager and Meeting List." },
      { src: "/images/sync_documentpage.png", alt: "Document Page View", caption: "Document View for Collaboration." },
    ],
    tags: ["Next.js", "Firebase", "Firestore", "Typescript", "Tailwind CSS", "Auth"],
    longDescription: "Sync() was designed as a productivity-focused platform to help users manage daily tasks, collaborate with teammates via a colleague linking system, and maintain editable user profiles. It features categorized task management (To Do, Work In Progress, Completed), meeting tracking, and interactive modals for user actions. The interface is highly dynamic, prioritizing responsive user feedback and real-time updates.",
    myRole: "Team Leader",
    myRoles: [
      "Project Manager",
      "Full-stack Developer",
      "Database Administrator",
    ],
    techStack: ["Next.js", "React", "Firebase Authentication", "Firestore", "Firebase Storage", "TypeScript", "Tailwind CSS", "Node.js", "RESTful APIs", "Vercel", "GitHub"],
    backendFeatures: [
      "User registration/login with Firebase Authentication.",
      "Profile information and image storage using Firestore and Firebase Storage.",
      "Task data management with real-time syncing per user.",
      "API routes for colleague linking and base detail retrieval using Firebase Admin SDK.",
    ],
    frontendFeatures: [
      "Fully responsive task board with status-based grouping.",
      "Modals for add/edit/delete confirmation with animations.",
      "Editable profile section with preview for name, gender, date of birth, and display photo.",
      "Dynamic UI updates upon task creation and profile modification.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Ensuring new display pictures reflected immediately before being saved.",
        solution: "Used URL.createObjectURL() to preview image uploads locally and only committed them to Firebase Storage upon saving."
      },
      {
        challenge: "Avoiding global refreshes on task addition or updates.",
        solution: "Implemented onSnapshot listeners from Firestore for live data syncing without reloading the page."
      },
      {
        challenge: "Preventing colleagues from seeing each other’s data",
        solution: "Filtered all data queries using user.uid and enforced access control rules in both the client and Firestore queries"
      },
    ],
    architectureDiagramUrl: "/images/project-sync-architecture.png",
    githubUrl: "https://github.com/mantequilla45/Sync",
  },
  {
    id: "6",
    slug: "wildchat-chatting-app",
    year: "2022",
    title: "Wildchat - Campus-Based Real-Time Chat Application",
    shortDescription: "A campus-exclusive desktop chat application built using Windows Forms in C#. It allows students to connect through real-time private messaging in a familiar and lightweight interface.",
    imageUrl: "/images/wildchat_login.png",
    carouselImages: [
      { src: "/images/wildchat_home.png", alt: "Landing Page View", caption: "Login/Registration Modals." },
      { src: "/images/wildchat_login.png", alt: "About Page View", caption: "What The Project is About." },
      { src: "/images/wildchat_register.png", alt: "Home Page View", caption: "Home Page With Projects." },
      { src: "/images/wildchat_account.png", alt: "User Account Page View", caption: "User can view/edit their details." },
      { src: "/images/wildchat_chat.png", alt: "Task Manager Page View", caption: "Task Manager and Meeting List." },
    ],
    tags: ["Windows Forms", ".NET", "SQL", "SSMS", "C#"],
    longDescription: "Wildchat was initially envisioned as a dating app tailored specifically for the lively Wildcats/Teknoys community, WildChat has transformed into an exclusive chatting platform for Wildcats. Providing a secure, enjoyable, and user-friendly environment, this app will allow students to engage in meaningful conversations, cultivate friendships, and foster connections within our school's network.",
    myRole: "Solo / Full-Stack Developer",
    techStack: ["Windows Forms", ".NET", "SQL", "C#", "Microsoft SQL Server (SSMS)"],
    backendFeatures: [
      "Integrated a basic messaging system that allowed simulated real-time communication.",
      "Utilized SQL Server Management Studio (SSMS) to manage user data and chat history.",
      "Implemented a basic user authentication",
    ],
    frontendFeatures: [
      "Designed and implemented a desktop-based chat interface using Windows Forms and C#.",
      "Created a simple message send/receive simulation to mimic chat flow for development.",
      "Disabled user interaction in display fields (RichTextBox) to enhance UI clarity and prevent input conflicts.",
      "Handled edge cases such as message duplication and button-triggered vs. Enter-key interactions.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Preventing user interaction with the RichTextBox.",
        solution: "Disabled it and changed appearance using [ReadOnly = true] and setting [BackColor] to match form."
      },
      {
        challenge: "Message duplication or delayed appearance.",
        solution: "Added checks to differentiate between Enter key and button click."
      },
      {
        challenge: "Simulating message reception from another user.",
        solution: "Used [Timer] or delayed method to insert and display a mock response"
      },
      {
        challenge: "Cursor still appearing on message display box.",
        solution: "Managed focus behavior and made RichTextBox uneditable but readable."
      },
      {
        challenge: "Database connectivity setup errors.",
        solution: "Used parameterized SQL queries and proper connection string from SSMS."
      },
      {
        challenge: "Deployment for testing on other machines.",
        solution: "Generated .exe file with local DB connection or backup SQL script."
      }
    ],
    classDiagramUrl: "/images/wildchat_cd.png",
    erdUrl: "/images/wildchat_erd.png",
    githubUrl: "https://github.com/Erudi787/WildChat---Campus-Based-Real-Time-Chat-Application--Unfinished",
  },
  {
    id: "7",
    slug: "lachowos-property-management",
    year: "2026",
    pullQuote: "Ten tools collapsed into one schema — billing, signatures, access control, screening, all reconciled in Postgres.",
    title: "LaChowOS - Property Management Platform",
    shortDescription: "A full-scale property management platform for culinary innovation facilities. Built as a monorepo with a NestJS API, Next.js admin/tenant portals, and 10+ third-party integrations.",
    tags: ["Next.js", "NestJS", "Prisma", "Stripe", "PostgreSQL", "Turborepo"],
    longDescription: "LaChowOS is a unified property management platform purpose-built for La Chow's mixed-use culinary innovation facilities. It replaces scattered management tools with a single, integrated system covering kitchen scheduling, tenant onboarding, digital lease management with eSignature, rent collection via Stripe, compliance document tracking, maintenance requests, and business intelligence reporting. The platform is built as a Turborepo monorepo with a NestJS backend (45+ modules), a Next.js App Router frontend with dual portals (admin and tenant), and a shared Prisma database layer — all connected to 10+ third-party services including Stripe, DocuSign, SendGrid, AWS S3, ButterflyMX, QuickBooks, and TransUnion SmartMove.",
    myRole: "Full-Stack Developer",
    myRoles: [
      "Backend Developer — NestJS API architecture, Prisma schema design, 45+ API modules",
      "Frontend Developer — Next.js App Router, admin & tenant portal UI, real-time dashboards",
      "Database Administrator — PostgreSQL schema design, migrations, query optimization",
      "Integration Engineer — Stripe payments, DocuSign eSignatures, SendGrid emails, AWS S3 storage",
      "DevOps — Docker, Render deployment, Turborepo build pipelines, Sentry monitoring",
    ],
    techStack: [
      "TypeScript", "Next.js", "React", "NestJS", "Prisma", "PostgreSQL", "Tailwind CSS",
      "shadcn/ui", "Radix UI", "React Query", "React Hook Form", "Zod", "Zustand",
      "FullCalendar", "Recharts", "Socket.IO", "Stripe", "DocuSign", "SendGrid",
      "AWS S3", "Clerk", "Sentry", "Turborepo", "pnpm", "Docker", "Render", "Supabase",
    ],
    backendFeatures: [
      "45+ NestJS modules covering tenants, leases, bookings, payments, compliance, maintenance, and more.",
      "Stripe integration for rent collection, guest charges, and payment tracking with webhook handlers.",
      "DocuSign eSignature API for digital lease signing workflows.",
      "SendGrid transactional email service for notifications, reminders, and tenant communications.",
      "AWS S3 presigned URL system for secure document and image uploads.",
      "ButterflyMX access control integration for managing property entry permissions.",
      "QuickBooks accounting sync for automated financial record-keeping.",
      "TransUnion SmartMove integration for tenant background screening.",
      "JWT-based authentication with Clerk, role-based access control (Admin, Tenant, Staff).",
      "Socket.IO real-time notifications and live updates across the platform.",
      "Cron-based scheduled jobs for lease expiration alerts, compliance reminders, and data syncs.",
      "PostgreSQL exclusion constraints to prevent double-booking of shared kitchen spaces.",
      "Comprehensive import system with idempotency via externalId for data migration.",
    ],
    frontendFeatures: [
      "Dual-portal architecture: full admin dashboard and tenant self-service portal.",
      "50+ admin pages covering tenant management, lease lifecycle, bookings, payments, compliance, and reports.",
      "Interactive booking calendar using FullCalendar with drag-and-drop scheduling.",
      "Real-time analytics dashboards with Recharts for revenue, occupancy, and compliance metrics.",
      "Complex multi-step forms for lease creation, tenant applications, and property configuration.",
      "Advanced data tables with TanStack React Table for sorting, filtering, and pagination.",
      "Dark/light mode theming with shadcn/ui and Radix UI accessible components.",
      "Responsive design supporting desktop and tablet admin workflows.",
    ],
    challengesAndSolutions: [
      {
        challenge: "Preventing double-booking of shared kitchen spaces across overlapping time slots.",
        solution: "Implemented PostgreSQL exclusion constraints with tsrange and a gist index, enforced at the database level so no application-layer race condition can create overlapping bookings."
      },
      {
        challenge: "Managing 45+ API modules without coupling or circular dependencies.",
        solution: "Used NestJS module-per-feature architecture with clearly defined service boundaries, shared DTOs via class-validator, and Prisma transactions for cross-module writes."
      },
      {
        challenge: "Handling secure document uploads for compliance files, lease agreements, and tenant documents.",
        solution: "Built an AWS S3 presigned URL system that generates time-limited upload/download links, keeping sensitive files off the application server entirely."
      },
      {
        challenge: "Migrating legacy data from DoorLoop while preventing duplicate records.",
        solution: "Designed an import system using externalId-based idempotency — each imported record is checked against its source ID before insertion, allowing safe re-runs of the import process."
      },
      {
        challenge: "Coordinating a monorepo with shared database types across frontend and backend.",
        solution: "Used Turborepo with pnpm workspaces and a shared database package that exports the generated Prisma client, ensuring type-safe database access across all apps."
      },
      {
        challenge: "Implementing digital lease signing with legally binding eSignatures.",
        solution: "Integrated DocuSign's eSignature API with envelope-based workflows, supporting multi-party signing, status callbacks, and automatic lease activation on completion."
      },
    ],
    githubUrl: "https://github.com/FutureThink-Edge/LaChowOS",
  },
];