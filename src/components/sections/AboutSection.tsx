// src/app/components/sections/AboutSection.tsx
'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserCircle, Briefcase, Lightbulb, Download, Award, BadgeCheck } from 'lucide-react';

interface AboutSectionProps { }

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>((props, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="py-16 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C6C6]/5 rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A4DDE] to-[#00C6C6] mb-4 tracking-tight">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            A brief introduction to who I am, my journey as a software engineer, and my technical approach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-20 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="md:col-span-2 flex justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00C6C6] to-[#0A4DDE] rounded-full blur-2xl opacity-20 transform scale-110"></div>
            <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white z-10">
              <Image
                src="/images/profile.jpg"
                alt="Elwison Denampo - Software Engineer"
                fill
                className="object-cover transform hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-3 space-y-8 text-gray-600 leading-relaxed"
          >
            <div>
              <h3 className="flex items-center text-2xl font-bold text-[#0B1120] mb-3">
                <UserCircle size={28} className="mr-3 text-[#00C6C6]" /> Who I Am
              </h3>
              <p className="text-[15px] md:text-base">
                Hello! I&apos;m Elwison Denampo, a Software Engineer with a strong focus on backend development and system design. I specialize in building scalable APIs, designing database architectures, and deploying production infrastructure. My journey into technology was driven by a curiosity to understand how complex systems work and a desire to build solutions that make a real impact.
              </p>
            </div>

            <div>
              <h3 className="flex items-center text-2xl font-bold text-[#0B1120] mb-3">
                <Briefcase size={28} className="mr-3 text-[#00C6C6]" /> My Journey & Experience
              </h3>
              <p className="text-[15px] md:text-base">
                I recently contributed to FutureThink Edge, a production AI-powered learning platform deployed on Render, where I built 40+ API endpoints, designed 42+ database models, and integrated multiple AI providers. I&apos;ve also led team projects like Book Buddi (ASP.NET Core library system) and BSDOC (health management platform). This experience has equipped me with strong skills in Python/FastAPI, C#/ASP.NET Core, Node.js, and multiple database systems including PostgreSQL, SQL Server, and Firebase.
              </p>
            </div>

            <div>
              <h3 className="flex items-center text-2xl font-bold text-[#0B1120] mb-3">
                <Lightbulb size={28} className="mr-3 text-[#00C6C6]" /> Technical Philosophy
              </h3>
              <p className="text-[15px] md:text-base">
                I believe in clean architecture, thorough testing, and continuous learning. My approach emphasizes security (implementing RBAC, JWT auth, audit logging), maintainability (Repository and Unit of Work patterns), and scalability (Redis caching, connection pooling). I&apos;m comfortable working across multiple tech stacks and always eager to explore new technologies to solve real-world problems.
              </p>
            </div>

            <div>
              <h3 className="flex items-center text-2xl font-bold text-[#0B1120] mb-4">
                <Award size={28} className="mr-3 text-[#00C6C6]" /> Achievements & Certifications
              </h3>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100"
                >
                  <div className="p-2 bg-[#0A4DDE]/10 rounded-lg">
                    <Award size={24} className="text-[#0A4DDE] flex-shrink-0" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0B1120]">2nd Prize — Huawei ICT Competition</p>
                    <p className="text-sm text-gray-500 mt-1">Network Track, Philippines (2025–2026)</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100"
                >
                  <div className="p-2 bg-[#00C6C6]/10 rounded-lg">
                    <BadgeCheck size={24} className="text-[#00C6C6] flex-shrink-0" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0B1120]">SEO Certification — HubSpot Academy</p>
                    <p className="text-sm text-gray-500 mt-1">Valid: Dec 2025 – Jan 2027</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="/resume/ElwisonDenampo_SoftwareEngineer_Resume.pdf"
                download
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#0A4DDE] text-white rounded-full font-semibold overflow-hidden shadow-[0_0_30px_rgba(10,77,222,0.3)] hover:shadow-[0_0_50px_rgba(10,77,222,0.5)] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Download size={20} className="relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Download My Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;