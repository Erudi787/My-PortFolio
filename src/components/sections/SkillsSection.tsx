// src/app/components/sections/SkillsSection.tsx
'use client';
import React, { forwardRef } from 'react'; // Import forwardRef
import { skillsData, Skill } from '../../../lib/data'; // Adjusted path based on common structures
import { motion } from 'framer-motion';
import {
  CheckCircle, Cpu, Database, Code, Zap, Settings, TerminalSquare, MessageSquare, GitMerge
} from 'lucide-react';
import { FaDiscord, FaFacebookMessenger, FaGithubSquare, FaGoogle, FaJira, FaMicrosoft } from 'react-icons/fa';
import { SiFirebase, SiSupabase } from 'react-icons/si'; // Aliased SiVisualstudiocode for clarity
import { VscVscode } from 'react-icons/vsc';

// Define props for the component (empty for now, but good practice)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SkillsSectionProps {}

const categoryIcons: Record<Skill['category'], React.ReactNode> = {
  Language: <Code size={22} className="text-sky-500" />,
  'Framework/Library': <Cpu size={22} className="text-teal-500" />,
  Database: <Database size={22} className="text-indigo-500" />,
  'API/Protocol': <GitMerge size={22} className="text-purple-500" />,
  'Cloud/DevOps': <Zap size={22} className="text-amber-500" />,
  Tool: <Settings size={22} className="text-slate-500" />,
  Communication: <MessageSquare size={22} className="text-blue-500" />,
  'Development Environment': <TerminalSquare size={22} className="text-green-500" />,
};

const skillSpecificIcons: Record<string, React.ReactNode> = {
  "Firebase (Realtime DB / Firestore)": <SiFirebase size={18} className="text-yellow-500 mr-2 flex-shrink-0" />,
  "Supabase (PostgreSQL)": <SiSupabase size={18} className="text-green-500 mr-2 flex-shrink-0" />,
  "Git & GitHub": <FaGithubSquare size={18} className="text-gray-700 mr-2 flex-shrink-0" />,
  "Jira": <FaJira size={18} className="text-blue-600 mr-2 flex-shrink-0" />,
  "VS Code": <VscVscode size={18} className="text-blue-500 mr-2 flex-shrink-0" />,
  "Discord": <FaDiscord size={18} className="text-indigo-500 mr-2 flex-shrink-0" />,
  "Google Meet": <FaGoogle size={18} className="text-green-600 mr-2 flex-shrink-0" />,
  "Microsoft Teams": <FaMicrosoft size={18} className="text-blue-500 mr-2 flex-shrink-0" />,
  "Facebook Messenger": <FaFacebookMessenger size={18} className="text-blue-500 mr-2 flex-shrink-0" />,
};

const SkillsSection = forwardRef<HTMLElement, SkillsSectionProps>((props, ref) => {
  const categorizedSkills: Record<string, Skill[]> = skillsData.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryOrder: Skill['category'][] = [
    'Language',
    'Framework/Library',
    'Database',
    'API/Protocol',
    'Cloud/DevOps',
    'Development Environment',
    'Tool',
    'Communication',
  ];

  return (
    <section
      ref={ref} // Assign the forwarded ref here
      id="skills" // This ID is crucial for navigation
      className="py-16 md:py-24 bg-[#F8F9FA]" // Using your direct hex for lightBg
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Using direct hex codes as a fallback if theme colors aren't working */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#070B0C] mb-3">My Technical Toolkit</h2>
          <p className="text-lg text-[#575454] max-w-xl mx-auto">
            A collection of technologies, tools, and platforms I leverage to build and manage projects effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryOrder.map((categoryName, index) => {
            const skillsInCategory = categorizedSkills[categoryName];
            if (!skillsInCategory || skillsInCategory.length === 0) return null;

            return (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }} // Adjusted delay slightly
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-center mb-5 pb-3 border-b border-gray-100">
                  <div className="p-2.5 bg-gray-100 rounded-lg mr-4">
                     {categoryIcons[categoryName] || <Settings size={24} className="text-slate-500" />}
                  </div>
                  <h3 className="text-xl font-semibold text-[#043CAA]">{categoryName}</h3> {/* primary color */}
                </div>
                <ul className="space-y-3 flex-grow">
                  {skillsInCategory.map((skill) => (
                    <li key={skill.name} className="flex items-start text-[#575454] text-sm"> {/* lightText color */}
                      <div className="flex-shrink-0 w-5 h-5 mr-2.5 mt-0.5">
                        {skillSpecificIcons[skill.name] || <CheckCircle size={18} className="text-[#62B6B8]" />} {/* secondary color */}
                      </div>
                      <div>
                        <span className="font-medium text-[#070B0C]/90">{skill.name}</span> {/* darkText with opacity */}
                        {skill.description && (
                          <span className="text-xs text-gray-500 block italic ml-0.5"> - {skill.description}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
        >
            <p className="text-md text-[#575454] italic"> {/* lightText color */}
                ...and I&apos;m always learning and adapting to new technologies!
            </p>
        </motion.div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection'; // Good practice for forwardRef components

export default SkillsSection;