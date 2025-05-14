'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '../../../lib/data'; // Assuming type is in data.ts
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
    >
      {project.imageUrl && (
        <div className="relative w-full h-56">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#043CAA] mb-2">{project.title}</h3>
        <p className="text-sm text-[#575454] mb-4 flex-grow">{project.shortDescription}</p>
        <div className="mb-4">
          {project.tags.slice(0, 3).map((tag) => ( // Show only first 3 tags for brevity
            <span
              key={tag}
              className="inline-block bg-[#62B6B8]/10 text-[#62B6B8] text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center justify-center text-sm font-semibold text-[#043CAA] hover:text-[#62B6B8] transition-colors group"
        >
          View Details
          <ArrowUpRight size={18} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;