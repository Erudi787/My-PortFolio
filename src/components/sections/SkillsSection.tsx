// src/app/components/sections/SkillsSection.tsx
'use client';
import React, { forwardRef, useMemo, useState } from 'react';
import { skillsData } from '../../../lib/data';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import { FaDiscord, FaDocker, FaFacebookMessenger, FaGithubSquare, FaJira } from 'react-icons/fa';
import { SiAndroidstudio, SiFirebase, SiSupabase, SiTypescript, SiJavascript, SiPython, SiPhp, SiHtml5, SiCss3, SiDart, SiCplusplus, SiTailwindcss, SiReact, SiNextdotjs, SiExpress, SiFlutter, SiGooglemeet, SiFastapi, SiSqlalchemy, SiPostgresql, SiRedis, SiJsonwebtokens, SiRender } from 'react-icons/si'; // Added more language icons
import { VscVscode } from 'react-icons/vsc';
import cLogo from "../../../public/images/c-programming.png";
import restAPILogo from "../../../public/images/restapi.png";
import cSharpLogo from "../../../public/images/csharp-logo.png";
import msAccessLogo from "../../../public/images/msaccess-logo.png";
import websocketLogo from "../../../public/images/websocket-logo.png";
import groqLogo from "../../../public/images/groq-logo.png";
import aspNetLogo from "../../../public/images/aspNet-logo.png";
import sqlServerLogo from "../../../public/images/sqlServer-logo.svg";
import automapperLogo from "../../../public/images/automapper-logo.png";
import Image from 'next/image';
import { DiMysql, DiNodejsSmall, DiSwift } from 'react-icons/di';
import { PiMicrosoftTeamsLogoFill, PiOpenAiLogo } from 'react-icons/pi';
import { GrGraphQl } from 'react-icons/gr';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SkillsSectionProps { }

// Enhanced skillSpecificIcons with more languages
const skillSpecificIcons: Record<string, React.ReactNode> = {
  "JavaScript": <SiJavascript size={72} className="text-yellow-400" />,
  "Python": <SiPython size={72} className="text-blue-400" />,
  "Tailwind CSS": <SiTailwindcss size={72} className='text-sky-300' />,
  "React": <SiReact size={72} className='text-blue-500' />,
  "Next.js": <SiNextdotjs size={72} className='text-black' />,
  "Express.js": <SiExpress size={72} className='text-black' />,
  "Flutter": <SiFlutter size={72} className='text-blue-400' />,
  "C": <Image src={cLogo} alt="C" width={72} height={72} unoptimized />,
  "C#": <Image src={cSharpLogo} alt='C#' width={64} height={64} unoptimized />,
  "REST APIs": <Image src={restAPILogo} alt='REST APIs' width={200} height={200} unoptimized />,
  "C++": <SiCplusplus size={72} className='text-blue-500' />,
  "PHP": <SiPhp size={72} className="text-indigo-400" />,
  "HTML5": <SiHtml5 size={72} className="text-orange-500" />,
  "CSS3": <SiCss3 size={72} className="text-blue-500" />,
  "Dart": <SiDart size={72} className="text-sky-400" />,
  "Swift": <DiSwift size={72} className="text-sky-400" />,
  "TypeScript": <SiTypescript size={72} className="text-blue-600" />, // Made icon larger for consistency
  "Node.js": <DiNodejsSmall size={72} className='text-blue-950' />,
  "Firebase": <SiFirebase size={72} className="text-yellow-500 mr-2 flex-shrink-0" />,
  "Supabase": <SiSupabase size={72} className="text-green-500 mr-2 flex-shrink-0" />,
  "Git & GitHub": <FaGithubSquare size={72} className="text-gray-700 mr-2 flex-shrink-0" />,
  "Jira": <FaJira size={72} className="text-blue-600 mr-2 flex-shrink-0" />,
  "VS Code": <VscVscode size={72} className="text-blue-500 mr-2 flex-shrink-0" />,
  "Android Studio": <SiAndroidstudio size={72} className="text-green-600 mr-2 flex-shrink-0" />,
  "Discord": <FaDiscord size={72} className="text-indigo-500 mr-2 flex-shrink-0" />,
  "Google Meet": <SiGooglemeet size={72} className="text-green-600 mr-2 flex-shrink-0" />,
  "Microsoft Teams": <PiMicrosoftTeamsLogoFill size={72} className="text-blue-500 mr-2 flex-shrink-0" />,
  "Facebook Messenger": <FaFacebookMessenger size={72} className="text-blue-500 mr-2 flex-shrink-0" />,
  "Docker": <FaDocker size={72} className='text-blue-500' />,
  "GraphQL": <GrGraphQl size={72} className='text-pink-400' />,
  "MSAccess": <Image src={msAccessLogo} alt='MSAccess' height={72} width={72} unoptimized />,
  "MySQL": <DiMysql size={72} className='text-sky-400' />,
  "FastAPI": <SiFastapi size={72} className='text-blue-500' />,
  "SQLAlchemy": <SiSqlalchemy size={72} className='text-blue-500' />,
  "PostgreSQL": <SiPostgresql size={72} className='text-blue-500' />,
  "Redis": <SiRedis size={72} className='text-red-500' />,
  "JWT Auth": <SiJsonwebtokens size={72} className='text-blue-500' />,
  "WebSocket": <Image src={websocketLogo} alt="Websocket" width={72} height={72} unoptimized />,
  "OpenAI API": <PiOpenAiLogo size={72} className="text-black mr-2 flex-shrink-0" />,
  "Groq API": <Image src={groqLogo} alt='Groq' height={72} width={72} unoptimized />,
  "Render": <SiRender size={72} className="text-black mr-2 flex-shrink-0" />,
  "ASP.NET Core": <Image src={aspNetLogo} alt='ASP.NET Core' height={72} width={72} unoptimized />,
  "SQL Server": <Image src={sqlServerLogo} alt='SQL Server' height={72} width={72} unoptimized />,
  "AutoMapper": <Image src={automapperLogo} alt='Automapper' height={72} width={72} unoptimized />,
};

const filterButtons = [
  { id: 'all', label: 'All Tools' },
  { id: 'core', label: 'Core Stack' },
  { id: 'language', label: 'Languages' },
  { id: 'framework/library', label: 'Frameworks / Libraries' }, // Tech I use most often / proficient with
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Databases' },
  { id: 'tool', label: 'Dev Tools' }, // Broader tools, IDEs, version control etc.
  { id: 'environment', label: 'Platforms & Environments' } // OS, Deployment etc.
];

const SkillsSection = forwardRef<HTMLElement, SkillsSectionProps>((props, ref) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSkills = useMemo(() => {
    if (activeFilter === 'all') return skillsData;
    return skillsData.filter(skill => skill.filterCategories.includes(activeFilter));
  }, [activeFilter])

  return (
    <section
      ref={ref}
      id="skills"
      className="py-16 md:py-24 bg-[#F8F9FA]"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 md:mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-[#070b0c] mb-3'>
            Tech Stack
          </h2>
          <p className='text-lg text-[#575454] max-w-xl mx-auto'>
            A collection of technologies, tools, and platforms I leverage to build and manage projects effectively.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex flex-wrap justify-center items-stretch gap-2 md:gap-3 mb-10 md:mb-12'
        >
          {filterButtons.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base text-black rounded-lg font-medium transition-all duration-200 ease-in-out flex items-center justify-center text-center min-h-[40px] sm:min-h-[44px]
                ${activeFilter === filter.id
                  ? 'bg-[#043caa] text-white shadow-md scale-105'
                  : 'bg-white text-[#70b0c] hover:bg-gray-200 border border-gray-200 hover:shadow-sm'
                }`}
              style={{ flexBasis: 'auto' }}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-x-4 gap-y-8 md:gap-y-10 justify-items-center'
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
              className='flex flex-col items-center justify-start w-full max-w-[100px] text-center group'
            >
              <div className='p-2 mb-1.5 transition-transform duration-200 group-hover:scale-110'>
                {skillSpecificIcons[skill.name] || (
                  <LayoutDashboard size={40} className='text-gray-400' />
                )}
              </div>
              <span className='text-xs sm:text-sm text-[#070b0c] font-medium leading-tight'>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {filteredSkills.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-center text-[#575454] mt-10'
          >
            No tools match the selected filter.
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }} // Adjusted delay based on number of categories
          className="text-center mt-16"
        >
          <p className="text-md text-[#575454] italic">
            ...and I&apos;m always learning and adapting to new technologies!
          </p>
        </motion.div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;