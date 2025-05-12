// src/app/components/sections/AboutSection.tsx
'use client';
import React, { forwardRef } from 'react'; // Import forwardRef
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserCircle, Briefcase, Lightbulb, Download } from 'lucide-react';

// Define props for the component if it ever needs them (empty for now)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AboutSectionProps {}

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>((props, ref) => {
  return (
    <section
      ref={ref} // Assign the forwarded ref
      id="about" // Crucial ID for navigation
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Ensure your Tailwind config colors are working, otherwise use direct hex or standard Tailwind colors */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#070B0C] mb-3"> {/* Assuming text-[#070B0C] works */}
            About Me
          </h2>
          <p className="text-lg text-[#575454] max-w-2xl mx-auto"> {/* Assuming text-[#575454] works */}
            A brief introduction to who I am, my journey as a backend developer, and my technical approach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl border-4 border-[#62B6B8]/50"> {/* Assuming secondary color works */}
              <Image
                src="/images/profile.jpg"
                alt="Elwison Denampo - Backend Developer" // Personalized alt text
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3 space-y-6 text-[#575454] leading-relaxed" // Assuming text-[#575454] works
          >
            <div>
              <h3 className="flex items-center text-xl font-semibold text-[#070B0C] mb-2"> {/* Assuming text-[#070B0C] works */}
                <UserCircle size={24} className="mr-2 text-[#62B6B8]" /> Who I Am {/* Assuming text-secondary works */}
              </h3>
              <p>
                Hello! I&apos;m Elwison Denampo, a passionate Backend Developer with a knack for crafting efficient, scalable, and reliable server-side solutions. My journey into the world of technology was driven by a curiosity to understand how complex systems work and a desire to build them.
              </p>
            </div>

            <div>
              <h3 className="flex items-center text-xl font-semibold text-[#070B0C] mb-2">
                <Briefcase size={24} className="mr-2 text-[#62B6B8]" /> My Journey & Experience
              </h3>
              <p>
                {/* Replace [X years] and bracketed content with your actual details */}
                Over the past [X years], I&apos;ve had the opportunity to work on diverse projects, from building APIs for web applications, developing microservices, to optimizing database performance. This has equipped me with a strong foundation in Node.js, Python, and various database systems. I particularly enjoy tackling architectural challenges or optimizing for high performance.
              </p>
            </div>

            <div>
              <h3 className="flex items-center text-xl font-semibold text-[#070B0C] mb-2">
                <Lightbulb size={24} className="mr-2 text-[#62B6B8]" /> Technical Philosophy
              </h3>
              <p>
                I believe in the principles of clean code, thorough testing, and continuous learning. My approach to backend development emphasizes security, maintainability, and creating systems that not only meet current needs but are also prepared for future growth. I&apos;m always eager to explore new technologies and methodologies to enhance my skillset.
              </p>
            </div>
             <div className="pt-6">
                <a
                  href="/resume/ElwisonDenampo_BackendDeveloper_Resume.pdf" // Example resume name
                  download
                  className="inline-flex items-center gap-2 bg-[#043CAA] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#043CAA]/90 transition-colors text-md shadow-md hover:shadow-lg" // Assuming primary color works
                >
                  <Download size={20} /> Download My Resume
                </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection'; // Good practice

export default AboutSection;