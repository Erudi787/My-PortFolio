# 🚀 Erudi's Portfolio

A modern, dynamic, and premium personal portfolio website. Built to showcase backend and full-stack development projects, featuring an immersive dark/light aesthetic, glassmorphism UI elements, and highly interactive animations. 

## 📦 Technologies

- `Next.js 15`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Framer Motion`
- `Lucide React`
- `React Slick` & `Yet Another React Lightbox`

## 🦄 Features

Here's what you can explore in this portfolio:

- **Immersive Hero Section**: An animated aurora/mesh gradient background with floating glowing orbs, creating a spectacular first impression.
- **Glassmorphic UI**: Extensive use of `backdrop-blur` and semi-transparent containers for project cards and contact forms to give a modern, layered appearance.
- **Interactive Project Showcase**: View detailed information about my projects including tech stacks, full descriptions, my roles, and visual galleries (carousels & lightboxes).
- **Dynamic Animations**: Smooth scroll-reveal animations using Framer Motion so elements effortlessly slide and fade into view as you navigate down the page.
- **Premium Contact Form**: A fully styled contact section featuring focused input glow rings and a shimmering submit button.

## 👩🏽‍🍳 The Process

I started by establishing a strong design system focusing on typography (Outfit for headings, Inter for body) and a deeply saturated premium color palette (slate, vibrant blues, and cyans). 

Next, I implemented the sticky glassmorphic Navbar to ensure seamless navigation across the single-page application structure. The Hero section was overhauled next, focusing heavily on Framer Motion to animate the background gradient mesh and text elements.

Once the foundation was laid, I moved on to the content sections. For the Projects and Skills sections, I heavily utilized Tailwind's utility classes to build consistent `backdrop-blur` cards with subtle borders and hover-lift effects. The individual project detail pages were built dynamically using Next.js routing, passing rich data from a local data store to a versatile Client Component containing image carousels and rich text.

Finally, I polished the Contact page by adding large, blurred background orbs for depth and refining the input fields with interactive focus states and a heavily animated submission button.

## 📚 What I Learned

During this project, I significantly refined my frontend development skills:

### 🎨 Advanced Tailwind CSS & Glassmorphism:
- **Depth and Layering**: Learned how to correctly stack elements using `relative`, `absolute`, `z-index`, and transparent background colors to create deep, convincing glass effects without cluttering the screen.

### 🎡 Framer Motion Animations:
- **Scroll Reveals**: Mastered `whileInView` and viewport options to trigger animations precisely when elements enter the screen.
- **Micro-interactions**: Implemented `whileHover` and staggered children animations (`variants`) for more liquid and responsive interactions.

### ⚡ Next.js App Router & Client Components:
- **Server/Client Separation**: Deepened my understanding of when to use Server Components for component structure and Client Components for interactivity (like carousels and lightboxes).

## 💭 How can it be improved?

- Implement a global Dark/Light mode toggle allowing users to choose their preferred theme.
- Connect the contact form to a real backend service (e.g., Resend or SendGrid) to securely process incoming emails.
- Add an integrated blog section using MDX to share technical tutorials and thoughts.
- Fetch project data from a headless CMS (like Sanity or Supabase) instead of a local data file.

## 🚦 Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` in the project directory to install the required dependencies.
3. Run `npm run dev` to start the development server.
4. Open [http://localhost:3000](http://localhost:3000) (or the port specified in your console) in your web browser to view the portfolio.
