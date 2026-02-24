'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../../lib/data'; // Assuming type is in data.ts

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative bg-white/70 dark:bg-[#0B1120]/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col h-full hover:shadow-[0_20px_40px_rgba(10,77,222,0.15)] transition-all duration-300 border border-white/50 dark:border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10 pointer-events-none z-0" />
      {project.imageUrl && (
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-7 flex flex-col flex-grow relative z-10">
        <h3 className="text-2xl font-bold text-[#0A4DDE] dark:text-[#00C6C6] mb-3 group-hover:text-[#00C6C6] transition-colors">{project.title}</h3>
        <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-5 flex-grow leading-relaxed">{project.shortDescription}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-[#0A4DDE]/10 dark:bg-[#00C6C6]/10 text-[#0A4DDE] dark:text-[#00C6C6] text-xs font-semibold px-3 py-1 rounded-full border border-[#0A4DDE]/20 dark:border-[#00C6C6]/20 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center text-sm font-semibold text-[#0B1120] dark:text-white group/link relative w-fit"
        >
          <span className="relative z-10 mr-2">View Details</span>
          <ArrowUpRight size={18} className="relative z-10 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300 text-[#00C6C6]" />
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00C6C6] transition-all duration-300 group-hover/link:w-full" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;