// src/components/sections/ProjectsSection.tsx — design/rei
import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../../lib/data';

export default function ProjectsSection() {
  const sorted = [...projectsData].sort((a, b) => {
    const ay = a.year ? parseInt(a.year, 10) : 0;
    const by = b.year ? parseInt(b.year, 10) : 0;
    return by - ay;
  });

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3 inline-flex items-baseline gap-1.5">
            <span aria-hidden="true">[</span>
            <span className="text-muted-foreground">§ 05</span>
            <span aria-hidden="true" className="text-muted-foreground">·</span>
            <span>Work</span>
            <span aria-hidden="true">]</span>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A selection of projects I&apos;ve shipped — production systems, side experiments,
            and the in-between. Each card links to a case study or the source.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/Erudi787"
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
          >
            <FaGithub size={16} /> Check My GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
