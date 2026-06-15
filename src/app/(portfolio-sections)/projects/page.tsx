import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectCard from '@/components/sections/ProjectCard';
import { projectsData } from '../../../../lib/data';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'The full archive of projects shipped by Elwison Denampo — production systems, side experiments, and case studies.',
};

export default function ProjectsPage() {
  const sorted = [...projectsData].sort((a, b) => {
    const ay = a.year ? parseInt(a.year, 10) : 0;
    const by = b.year ? parseInt(b.year, 10) : 0;
    return by - ay;
  });

  return (
    <section className="relative pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-6 inline-flex items-baseline gap-1.5">
          <span aria-hidden="true">[</span>
          <span className="text-muted-foreground">§ 05</span>
          <span aria-hidden="true" className="text-muted-foreground">·</span>
          <span>Work · Archive</span>
          <span aria-hidden="true">]</span>
        </p>

        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            All <span className="text-primary">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Production systems, side experiments, and the in-between. Each card
            links to a case study or the source — whichever is more useful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://github.com/Erudi787"
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button w-fit inline-flex items-center mx-auto gap-2"
          >
            <FaGithub size={16} /> More on GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
