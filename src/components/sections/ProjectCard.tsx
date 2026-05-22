// src/components/sections/ProjectCard.tsx — high-end v2 (image-dominated)
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '../../../lib/data';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const reduce = useReducedMotion();
  const spring = { type: 'spring' as const, stiffness: 160, damping: 28, mass: 0.9 };
  const reveal = reduce
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: spring,
      };

  const href = `/projects/${project.slug}`;
  const tags = project.tags.slice(0, 4);
  const title = shortTitle(project.title);

  return (
    <motion.article {...reveal} className="group">
      <Link
        href={href}
        className="relative block rounded-2xl overflow-hidden border border-border bg-bg-elevated aspect-[4/5] md:aspect-[3/4]"
      >
        {/* Image or graphic fallback */}
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[1000ms] ease-out motion-safe:group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'radial-gradient(ellipse at top, color-mix(in oklch, var(--accent) 28%, var(--bg-elevated)) 0%, var(--bg-deep) 70%)',
            }}
          >
            <span
              className="font-display text-fg/40 text-[10rem] leading-none select-none"
              style={{ letterSpacing: '-0.06em' }}
            >
              {title.split(' ').map(w => w.charAt(0)).slice(0, 2).join('')}
            </span>
          </div>
        )}

        {/* Year + live badge — top corners */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          {project.year && (
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-fg/90 px-2.5 py-1 rounded-md bg-bg-deep/70 backdrop-blur-md border border-border">
              {project.year}
            </span>
          )}
          {project.liveDemoUrl && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-fg/90 px-2.5 py-1 rounded-md bg-bg-deep/70 backdrop-blur-md border border-border">
              <span aria-hidden="true" className="relative inline-block h-1 w-1 rounded-full bg-[color:var(--signal-live)]">
                <span className="absolute inset-0 rounded-full bg-[color:var(--signal-live)] motion-safe:animate-ping opacity-70" />
              </span>
              Live
            </span>
          )}
        </div>

        {/* Bottom overlay — gradient + title + tags */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-10 bg-gradient-to-t from-bg-deep via-bg-deep/85 to-transparent">
          <h3 className="font-display text-fg text-2xl md:text-[1.75rem] leading-[1.05] tracking-[-0.025em] mb-3">
            {title}
          </h3>
          <p className="text-sm text-fg-muted leading-snug mb-4 line-clamp-2 max-w-md">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-fg-subtle">
            {tags.map((tag, i) => (
              <span key={tag}>
                {tag}
                {i < tags.length - 1 && <span aria-hidden="true" className="ml-2 text-border-strong">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Accent line that draws on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] bg-accent transform scale-x-0 origin-left transition-transform duration-700 ease-out group-hover:scale-x-100 z-20"
        />
      </Link>
    </motion.article>
  );
};

function shortTitle(title: string): string {
  for (const sep of [' — ', ' – ', ' - ']) {
    const idx = title.indexOf(sep);
    if (idx > 0) return title.slice(0, idx);
  }
  return title;
}

export default ProjectCard;
