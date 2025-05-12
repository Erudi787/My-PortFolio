// src/app/components/sections/ProjectDetailClient.tsx
'use client'; // This marks the component as a Client Component

import Image from 'next/image';
import { Project } from '../../../lib/data';// Assuming your Project type is here
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Share2, CheckCircle, AlertTriangle, Zap, UserCircle } from 'lucide-react'; // Example icons
import { FaGithub } from 'react-icons/fa';

interface ProjectDetailClientProps {
  project: Project;
}

const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({ project }) => {
  // You can add client-side state and effects here if needed later
  // For example, for an image carousel:
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15, // Stagger animation
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <article className="bg-white p-6 md:p-10 rounded-xl shadow-xl border border-gray-200">
      {/* Project Header */}
      <motion.header
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="mb-8 pb-6 border-b border-gray-200"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#043CAA] mb-3">{project.title}</h1>
        <p className="text-lg text-[#575454]">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <span key={tech} className="bg-[#62B6B8]/10 text-[#62B6B8] text-xs font-medium px-3 py-1 rounded-full">{tech}</span>
          ))}
        </div>
      </motion.header>

      {/* Main Image (if any) */}
      {project.imageUrl && (
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-8 rounded-lg overflow-hidden shadow-md"
        >
          <Image
            src={project.imageUrl}
            alt={`${project.title} main image`}
            width={1200} height={675}
            className="w-full h-auto object-cover"
            priority // Consider if this is LCP for the specific project page
          />
        </motion.div>
      )}

      {/* Using Tailwind Typography for rich text if longDescription contains Markdown-like content
          Otherwise, just use regular Tailwind classes.
          For now, assuming simple text.
      */}
      <div className="text-[#575454] leading-relaxed space-y-8">
        <motion.section custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl font-semibold text-[#070B0C] mb-4 flex items-center">
            <FileText size={24} className="mr-3 text-[#043CAA]" /> Project Overview
          </h2>
          <p>{project.longDescription}</p>
        </motion.section>

        <motion.section custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl font-semibold text-[#070B0C] mb-4 flex items-center">
            <UserCircle size={24} className="mr-3 text-[#043CAA]" /> My Role & Responsibilities {/* Assuming UserCircle is imported or defined */}
          </h2>
          <p className="mb-2 text-[#070B0C]/90 font-semibold">Main Role: </p> <span className='mb-2 text-[#070B0C] pl-5.75'>{project.myRole}</span>
          {/* Check if myRoles array exists and has items, then display them */}
          {project.myRoles && project.myRoles.length > 0 && (
            <div className="mt-3">
              <h4 className="font-semibold text-[#070B0C]/90 mb-1 flex items-center">
                Key Responsibilities/Focus Areas:
              </h4>
               <p className="text-sm text-[#070B0C] pl-6"> {/* Adjust pl-6 to pl-4, pl-8 etc. as needed */}
                {project.myRoles.join(', ')}
              </p>
            </div>
          )}
        </motion.section>

        <motion.section custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl font-semibold text-[#070B0C] mb-4 flex items-center">
            <Zap size={24} className="mr-3 text-[#043CAA]" /> Key Backend Features
          </h2>
          <ul className="list-none pl-0 space-y-2">
            {project.backendFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={20} className="text-[#62B6B8] mr-3 mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl font-semibold text-[#070B0C] mb-4 flex items-center">
            <AlertTriangle size={24} className="mr-3 text-[#043CAA]" /> Challenges & Solutions
          </h2>
          <div className="space-y-4">
            {project.challengesAndSolutions.map((item, index) => (
              <div key={index} className="bg-[#F8F9FA] p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-[#070B0C]/90 mb-1">{item.challenge}</h3>
                <p className="text-sm">{item.solution}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {project.architectureDiagramUrl && (
          <motion.section custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="text-2xl font-semibold text-[#070B0C] mb-4 flex items-center">
              <Share2 size={24} className="mr-3 text-[#043CAA]" /> System Architecture
            </h2>
            <div className="my-6 p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
              <Image
                src={project.architectureDiagramUrl}
                alt={`${project.title} Architecture Diagram`}
                width={800}
                height={450} // Adjust aspect ratio as needed
                className="max-w-full h-auto rounded-md shadow-sm mx-auto"
              />
              <p className="text-sm text-gray-500 mt-2 italic">High-level architecture diagram.</p>
            </div>
          </motion.section>
        )}
      </div>

      {/* Links Section */}
      <motion.div
        custom={7}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-4 items-center"
      >
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FaGithub size={18} /> View on GitHub
          </a>
        )}
        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#043CAA] rounded-lg hover:bg-[#043CAA]/90 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#043CAA]/70"
          >
            <ExternalLink size={18} /> Deployed Website
          </a>
        )}
        {/* Add other links like "View Code Snippet" if applicable */}
      </motion.div>
    </article>
  );
};

export default ProjectDetailClient;