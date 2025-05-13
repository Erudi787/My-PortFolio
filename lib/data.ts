// Define types for your data
export interface Skill {
  name: string;
  category: 'Language' | 'Framework/Library' | 'Database' | 'API/Protocol' | 'Cloud/DevOps' | 'Tool' | 'Communication' | 'Development Environment';
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
}

export const skillsData: Skill[] = [
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Next.js (API Routes)", category: "Framework/Library" },
  { name: "Express.js", category: "Framework/Library" },
  { name: "Supabase (PostgreSQL)", category: "Database" },
  { name: "Firebase (Realtime DB / Firestore)", category: "Database" },
  { name: "REST APIs", category: "API/Protocol" },
  { name: "GraphQL", category: "API/Protocol" },
  { name: "Docker", category: "Cloud/DevOps" },
  { name: "Git & GitHub", category: "Tool", description: "Version Control" },
  { name: "Jira", category: "Tool", description: "Task Tracking & Project Management" },
  { name: "VS Code", category: "Development Environment", description: "Primary Code Editor" },
  { name: "Discord", category: "Communication", description: "Team & Community Chat" },
  { name: "Google Meet", category: "Communication", description: "Video Conferencing" },
  { name: "Microsoft Teams", category: "Communication", description: "Team Collaboration & Meetings" },
  { name: "Facebook Messenger", category: "Communication", description: "Informal Team Communication" },
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
  // Add more projects
];