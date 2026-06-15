// src/components/sections/ProjectCard.tsx — design/rei
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Project } from '../../../lib/data';

interface ProjectCardProps {
  project: Project;
}

function shortTitle(title: string): string {
  for (const sep of [' — ', ' – ', ' - ']) {
    const idx = title.indexOf(sep);
    if (idx > 0) return title.slice(0, idx);
  }
  return title;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const title = shortTitle(project.title);
  const tags = project.tags.slice(0, 5);

  return (
    <div className="group gradient-border overflow-hidden card-hover">
      {/* Image */}
      <div className="h-48 overflow-hidden bg-secondary/30">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={title}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary/40 text-6xl font-bold">
            {title.charAt(0)}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium border border-border rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo`}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source on GitHub`}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                <FaGithub size={20} />
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1"
          >
            Case study <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
