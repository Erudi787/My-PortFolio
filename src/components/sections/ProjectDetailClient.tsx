// src/app/components/sections/ProjectDetailClient.tsx
'use client'; // This marks the component as a Client Component

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Share2, CheckCircle, AlertTriangle, Zap, UserCircle, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'; // Example icons
import { FaGithub } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Project } from '../../../lib/data';// Assuming your Project type is here

interface ProjectDetailClientProps {
  project: Project;
}

const Slider = dynamic(() => import('react-slick'), {
  ssr: false, // This is the key part
  loading: () => <div className="text-center p-4">Loading carousel...</div> // Optional loading state
});

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  // Remove slick-arrow default conflicting classes if they cause issues with Tailwind
  const baseClassName = className?.includes('slick-disabled') ? 'slick-disabled' : '';

  return (
    <button
      className={`${baseClassName} absolute top-1/2 -translate-y-1/2 right-0 z-10 transform
                 p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 
                 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200
                 text-white disabled:opacity-30 disabled:cursor-not-allowed`}
      style={{ ...style }} // Pass through style for positioning if react-slick provides it
      onClick={onClick}
      aria-label="Next slide"
      disabled={className?.includes('slick-disabled')}
    >
      <ChevronRight size={24} className="w-5 h-5 md:w-6 md:h-6" /> {/* Increased size */}
    </button>
  );
}

// Custom Previous Arrow Component
const SamplePrevArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  const baseClassName = className?.includes('slick-disabled') ? 'slick-disabled' : '';

  return (
    <button
      className={`${baseClassName} absolute top-1/2 -translate-y-1/2 left-0 z-10 transform
                 p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 
                 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200
                 text-white disabled:opacity-30 disabled:cursor-not-allowed`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Previous slide"
      disabled={className?.includes('slick-disabled')}
    >
      <ChevronLeft size={24} className="w-5 h-5 md:w-6 md:h-6" /> {/* Increased size */}
    </button>
  );
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

  // Settings for react-slick carousel
  const carouselSettings = {
    dots: true,              // react-slick expects boolean
    infinite: true,          // react-slick expects boolean
    speed: 500,
    slidesToShow: 1,         // react-slick expects number
    slidesToScroll: 1,       // react-slick expects number
    autoPlay: true,          // Corrected: react-slick expects boolean, camelCased for JSX
    autoplaySpeed: 3000,     // react-slick expects number
    pauseOnHover: true,      // react-slick expects boolean
    adaptiveHeight: true,    // react-slick expects boolean
    arrow: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dotsClass: "slick-dots custom-dots-styling",
    // Add more settings as needed: arrows, responsive breakpoints, etc.
    // Example for custom arrows (you'd need to style these)
  };

  // State for Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Prepare slides for the lightbox
  const lightboxSlides = project.carouselImages?.map(img => ({
    src: img.src,
    alt: img.alt,
    title: img.caption, // Optional: Show caption as title in lightbox
  })) || [];

  const hasCarouselImages = project.carouselImages && project.carouselImages.length > 0;
  const hasFrontendFeatures = project.frontendFeatures && project.frontendFeatures.length > 0;
  const hasClassDiagram = project.classDiagramUrl && project.classDiagramUrl.length > 0;
  const hasERD = project.erdUrl && project.erdUrl.length > 0;

  return (
    <article className="bg-white/70 dark:bg-[#0B1120]/70 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/50 dark:border-white/10 relative transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 dark:from-white/5 dark:to-transparent rounded-[2rem] pointer-events-none" />

      {/* Project Header */}
      <motion.header
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="mb-8 pb-6 border-b border-gray-200 dark:border-white/10"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A4DDE] to-[#00C6C6] mb-4 tracking-tight">{project.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">{project.shortDescription}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.techStack.map(tech => (
            <span key={tech} className="bg-gradient-to-r from-[#0A4DDE]/10 to-[#00C6C6]/10 text-[#0A4DDE] border border-[#0A4DDE]/20 shadow-sm text-sm font-semibold px-4 py-1.5 rounded-full">{tech}</span>
          ))}
        </div>
      </motion.header>

      {/* Main Image (if any) */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="my-8"
      >
        {hasCarouselImages ? (
          // Render Carousel
          <section> {/* Added section for consistent structure with h2 */}
            <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
              <ImageIcon size={26} className="mr-3 text-[#0A4DDE]" /> Project Preview
            </h2>
            <span className="text-[#070B0C]/70 dark:text-[#f8fafc]/70 mb-6 flex items-center text-sm italic">Click the image for better quality</span>
            <div className="bg-gray-100 dark:bg-[#030712] p-2 sm:p-4 rounded-lg shadow-inner relative slick-container-custom">
              <Slider {...carouselSettings}>
                {project.carouselImages!.map((image, index) => ( // Added non-null assertion '!' because of hasCarouselImages check
                  <div
                    key={index}
                    className="outline-none focus:outline-none px-1 sm:px-2"
                    onClick={() => openLightbox(index)} // Open lightbox on image click
                    title="Click to enlarge"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-200 dark:bg-[#0B1120]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 600px, 800px"
                        quality={90}
                        priority={index === 0}
                        unoptimized
                      />
                    </div>
                    {image.caption && (
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic px-2">{image.caption}</p>
                    )}
                    {!image.caption && (
                      <div className="mt-3 mb-8 h-5" /> // Adjust h-5 as needed
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        ) : project.imageUrl ? (
          // Render Single Main Image if no carousel but imageUrl exists
          <section> {/* Added section for consistent structure with h2 */}
            <h2 className="text-2xl font-semibold text-[#070B0C] dark:text-[#f8fafc] mb-4 flex items-center">
              <ImageIcon size={24} className="mr-3 text-[#043CAA]" /> Project Preview
            </h2>
            <span className="text-[#070B0C]/70 dark:text-[#f8fafc]/70 mb-4 flex items-center text-sm italic">Click the image for better quality</span>
            <div
              className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-white/10"
              onClick={() => { // Make single image open in lightbox too
                if (project.imageUrl) {
                  setLightboxIndex(0); // Only one image
                  setLightboxOpen(true);
                }
              }}
              title="Click to enlarge"
            >
              <div className="relative aspect-video w-full bg-gray-100 dark:bg-[#030712]">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} main image`}
                  fill
                  className="object-contain" // Use object-contain to see the whole image
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 600px, 800px"
                  priority // Consider if this is LCP
                  unoptimized
                />
              </div>
            </div>
          </section>
        ) : null} {/* Optionally render nothing or a placeholder if no images at all */}
      </motion.div>

      {/* Lightbox Component */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={hasCarouselImages ? lightboxSlides : (project.imageUrl ? [{ src: project.imageUrl, alt: project.title }] : [])}
          index={lightboxIndex}
        // Optional plugins:
        // plugins={[Thumbnails, Counter, Zoom]}
        // styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }} // Example custom style
        />
      )}

      {/* Using Tailwind Typography for rich text if longDescription contains Markdown-like content
          Otherwise, just use regular Tailwind classes.
          For now, assuming simple text.
      */}
      <div className="text-[#575454] dark:text-gray-400 leading-relaxed space-y-8">
        <motion.section custom={2} initial="hidden" animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
            <FileText size={26} className="mr-3 text-[#0A4DDE]" /> Project Overview
          </h2>
          <p>{project.longDescription}</p>
        </motion.section>

        <motion.section custom={3} initial="hidden" animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
            <UserCircle size={26} className="mr-3 text-[#0A4DDE]" /> My Role & Responsibilities {/* Assuming UserCircle is imported or defined */}
          </h2>
          <p className="mb-2 text-[#070B0C]/90 dark:text-gray-300 font-semibold">Main Role: </p> <span className='mb-2 text-[#070B0C] dark:text-gray-400 pl-5.75'>{project.myRole}</span>
          {/* Check if myRoles array exists and has items, then display them */}
          {project.myRoles && project.myRoles.length > 0 && (
            <div className="mt-3">
              <h4 className="font-semibold text-[#070B0C]/90 dark:text-gray-300 mb-1 flex items-center">
                Key Responsibilities/Focus Areas:
              </h4>
              <p className="text-sm text-[#070B0C] dark:text-gray-400 pl-6"> {/* Adjust pl-6 to pl-4, pl-8 etc. as needed */}
                {project.myRoles.join(', ')}
              </p>
            </div>
          )}
        </motion.section>

        {hasFrontendFeatures ? (
          <motion.section custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
              <Zap size={26} className="mr-3 text-[#0A4DDE]" /> Key Frontend Features
            </h2>
            <ul className="list-none pl-0 space-y-2">
              {project.frontendFeatures?.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={20} className="text-[#00C6C6] mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        ) : null}

        <motion.section custom={4} initial="hidden" animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
            <Zap size={26} className="mr-3 text-[#0A4DDE]" /> Key Backend Features
          </h2>
          <ul className="list-none pl-0 space-y-2">
            {project.backendFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={20} className="text-[#62B6B8] mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section custom={5} initial="hidden" animate="visible" variants={sectionVariants}>
          <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
            <AlertTriangle size={26} className="mr-3 text-[#0A4DDE]" /> Challenges & Solutions
          </h2>
          <div className="space-y-4">
            {project.challengesAndSolutions.map((item, index) => (
              <div key={index} className="bg-white/60 dark:bg-[#0B1120]/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-[#0B1120] dark:text-[#f8fafc] mb-2">{item.challenge}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.solution}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {project.architectureDiagramUrl && (
          <motion.section custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
              <Share2 size={26} className="mr-3 text-[#0A4DDE]" /> System Architecture
            </h2>
            <div className="my-6 p-4 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-[#030712] text-center">
              <Image
                src={project.architectureDiagramUrl}
                alt={`${project.title} Architecture Diagram`}
                width={800}
                height={450} // Adjust aspect ratio as needed
                className="max-w-full h-auto rounded-md shadow-sm mx-auto"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">High-level architecture diagram.</p>
            </div>
          </motion.section>
        )}

        {hasClassDiagram ? (
          <motion.section custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
              <Share2 size={26} className="mr-3 text-[#0A4DDE]" /> Class Diagram
            </h2>
            <div className="my-6 p-4 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-[#030712] text-center">
              <Image
                src={project.classDiagramUrl ?? ''}
                alt={`${project.title} Architecture Diagram`}
                width={800}
                height={450} // Adjust aspect ratio as needed
                className="max-w-full h-auto rounded-md shadow-sm mx-auto"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">Project class diagram.</p>
            </div>
          </motion.section>
        ) : null}

        {hasERD ? (
          <motion.section custom={6} initial="hidden" animate="visible" variants={sectionVariants}>
            <h2 className="text-2xl font-bold text-[#0B1120] dark:text-[#f8fafc] mb-6 flex items-center">
              <Share2 size={26} className="mr-3 text-[#0A4DDE]" /> Entity Relationship Diagram
            </h2>
            <div className="my-6 p-4 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-[#030712] text-center">
              <Image
                src={project.erdUrl ?? ''}
                alt={`${project.title} Entity Relationship Diagram`}
                width={800}
                height={450} // Adjust aspect ratio as needed
                className="max-w-full h-auto rounded-md shadow-sm mx-auto"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">Project entity relationship diagram.</p>
            </div>
          </motion.section>
        ) : null}
      </div>

      {/* Links Section */}
      <motion.div
        custom={7}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="mt-10 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-wrap gap-4 items-center"
      >
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0B1120] dark:text-[#f8fafc] bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-white/20 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            <FaGithub size={18} /> View on GitHub
          </a>
        )}
        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0A4DDE] rounded-xl shadow-[0_0_20px_rgba(10,77,222,0.3)] hover:shadow-[0_0_40px_rgba(10,77,222,0.5)] transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <ExternalLink size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Deployed Website</span>
          </a>
        )}
        {/* Add other links like "View Code Snippet" if applicable */}
      </motion.div>
    </article>
  );
};

export default ProjectDetailClient;