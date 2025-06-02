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
  // Add more skills
];

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "bsdoc-health-platform",
    title: "BSDOC - Personal Health Management Platform",
    shortDescription: "A comprehensive platform for health record management, OTC suggestions, and doctor appointments.",
    imageUrl: "/images/bsdoc-thumbnail.jpg", // Create a placeholder or actual image
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
    id: "2",
    slug: "sync-task-collaboration",
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
    id: "3",
    slug: "wildchat-chatting-app",
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
  // Add more projects
];