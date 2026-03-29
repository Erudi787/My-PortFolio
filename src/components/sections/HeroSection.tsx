// src/app/components/sections/HeroSection.tsx
'use client';
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeroSectionProps { }

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>((props, ref) => {
  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] text-white py-20 px-6"
    >
      {/* Animated Aurora Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#0A4DDE] blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#00C6C6] blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-[#FFB347] blur-[120px]"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6C6] to-[#0A4DDE]">Elwison Denampo</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <p className="text-2xl sm:text-3xl font-light mb-6 text-gray-200">
            Full-Stack Developer
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          I specialize in building robust, scalable, and efficient server-side applications and APIs. Passionate about clean code, system design, and leveraging technology to solve complex problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <Link href="/projects"
            className="group relative px-8 py-4 bg-white text-[#0A4DDE] rounded-full font-semibold text-lg overflow-hidden shadow-[0_0_40px_rgba(10,77,222,0.4)] hover:shadow-[0_0_60px_rgba(10,77,222,0.6)] transition-all duration-300 w-full sm:w-auto text-center"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>

          <Link href="/contact"
            className="group relative px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <span>Get In Touch</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;