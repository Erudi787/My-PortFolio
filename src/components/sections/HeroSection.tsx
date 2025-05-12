// src/app/components/sections/HeroSection.tsx
'use client';
import React, { forwardRef } from 'react'; // Import forwardRef
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Define props for the component if it ever needs them (empty for now)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeroSectionProps {}

// Use forwardRef to allow parent components to pass a ref to the <section> element
const HeroSection = forwardRef<HTMLElement, HeroSectionProps>((props, ref) => {
  return (
    <section
      ref={ref} // Assign the forwarded ref to the section element
      id="home"  // This ID is crucial for the IntersectionObserver and direct hash links
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#043CAA] via-[#62B6B8] to-[#FFD580]/30 text-white py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Hi, I&apos;m Elwison Denampo
        </h1>
        <p className="text-2xl sm:text-3xl font-light mb-4">
          Backend Developer
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed"
        >
          I specialize in building robust, scalable, and efficient server-side applications and APIs. Passionate about clean code, system design, and leveraging technology to solve complex problems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link href="/projects" // This will be a page link, not a scroll link from here
            className="bg-white text-[#043CAA] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            View My Work
          </Link>
          <Link href="/contact" // This will be a page link
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#043CAA] transition-colors text-lg shadow-lg hover:shadow-xl w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Get In Touch <ArrowRight size={20} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
});

// It's good practice to set a displayName for components wrapped in forwardRef for better debugging.
HeroSection.displayName = 'HeroSection';

export default HeroSection;