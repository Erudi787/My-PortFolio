// src/components/sections/ProjectsSection.tsx — design/rei
// Homepage teaser: shows the 3 most recent projects and links out to /projects
// for the full archive.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../../lib/data';

export default function ProjectsSection() {
  const recent = [...projectsData]
    .sort((a, b) => {
      const ay = a.year ? parseInt(a.year, 10) : 0;
      const by = b.year ? parseInt(b.year, 10) : 0;
      return by - ay;
    })
    .slice(0, 3);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3 inline-flex items-baseline gap-1.5">
              <span aria-hidden="true">[</span>
              <span className="text-muted-foreground">§ 05</span>
              <span aria-hidden="true" className="text-muted-foreground">·</span>
              <span>Work</span>
              <span aria-hidden="true">]</span>
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Recent <span className="text-primary">Highlights</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Three of the most recent things I&apos;ve shipped.
              See the rest of the archive for the full list.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group whitespace-nowrap"
          >
            View all projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recent.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
