// src/components/sections/ProjectDetailClient.tsx — high-end v2 (product case-study layout)
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Project } from '../../../lib/data';

interface ProjectDetailClientProps {
  project: Project;
}

const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div className="aspect-video w-full bg-bg-elevated animate-pulse" />,
});

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <button
    className={`${className?.includes('slick-disabled') ? 'opacity-30 cursor-not-allowed' : ''} absolute top-1/2 -translate-y-1/2 left-4 z-10 p-2 rounded-full glass border border-border text-fg hover:bg-bg-elevated transition-colors`}
    onClick={onClick}
    aria-label="Previous slide"
    disabled={className?.includes('slick-disabled')}
  >
    <ChevronLeft size={18} />
  </button>
);

const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <button
    className={`${className?.includes('slick-disabled') ? 'opacity-30 cursor-not-allowed' : ''} absolute top-1/2 -translate-y-1/2 right-4 z-10 p-2 rounded-full glass border border-border text-fg hover:bg-bg-elevated transition-colors`}
    onClick={onClick}
    aria-label="Next slide"
    disabled={className?.includes('slick-disabled')}
  >
    <ChevronRight size={18} />
  </button>
);

function shortTitle(title: string): string {
  for (const sep of [' — ', ' – ', ' - ']) {
    const idx = title.indexOf(sep);
    if (idx > 0) return title.slice(0, idx);
  }
  return title;
}

function subtitle(title: string): string {
  for (const sep of [' — ', ' – ', ' - ']) {
    const idx = title.indexOf(sep);
    if (idx > 0) return title.slice(idx + sep.length);
  }
  return '';
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-mono uppercase tracking-[0.22em] text-accent mb-6 inline-flex items-baseline gap-1.5">
      <span aria-hidden="true">[</span>
      <span>{children}</span>
      <span aria-hidden="true">]</span>
    </p>
  );
}

const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({ project }) => {
  const reduce = useReducedMotion();
  const spring = { type: 'spring' as const, stiffness: 160, damping: 28, mass: 0.9 };
  const fade = (delay = 0) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { ...spring, delay },
        };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: 'slick-dots custom-dots-styling',
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  const lightboxSlides = project.carouselImages?.map(img => ({
    src: img.src,
    alt: img.alt,
    title: img.caption,
  })) ?? [];

  const hasCarousel = !!project.carouselImages && project.carouselImages.length > 0;
  const hasFrontend = !!project.frontendFeatures?.length;
  const hasBackend = !!project.backendFeatures?.length;
  const hasClassDiagram = !!project.classDiagramUrl;
  const hasERD = !!project.erdUrl;

  const title = shortTitle(project.title);
  const sub = subtitle(project.title);

  return (
    <article className="bg-bg text-fg min-h-screen pt-20 pb-32">
      {/* Hero — title block above the image */}
      <div className="container mx-auto px-6 md:px-10">
        <motion.nav {...fade(0)} className="mb-12" aria-label="Breadcrumb">
          <Link
            href="/projects"
            className="group inline-flex items-baseline gap-2 text-[13px] text-fg-muted hover:text-fg transition-colors"
          >
            <span aria-hidden="true" className="transition-transform motion-safe:group-hover:-translate-x-0.5">←</span>
            <span className="link-underline">Back to work</span>
          </Link>
        </motion.nav>

        <motion.header {...fade(0.05)} className="max-w-5xl mb-16 md:mb-20">
          {/* Top meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-8">
            {project.year && (
              <span>
                <span className="text-fg-muted">{project.year}</span>
              </span>
            )}
            <span className="text-border-strong" aria-hidden="true">·</span>
            <span>{project.myRole}</span>
            {project.liveDemoUrl && (
              <>
                <span className="text-border-strong" aria-hidden="true">·</span>
                <span className="inline-flex items-baseline gap-1.5">
                  <span aria-hidden="true" className="relative inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--signal-live)] translate-y-[1px]">
                    <span className="absolute inset-0 rounded-full bg-[color:var(--signal-live)] motion-safe:animate-ping opacity-70" />
                  </span>
                  <span className="text-fg-muted">Live</span>
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-fg text-5xl md:text-7xl lg:text-[6rem]">
            {title}
          </h1>
          {sub && (
            <p className="mt-4 text-xl md:text-2xl text-fg-muted leading-tight max-w-3xl">
              {sub}
            </p>
          )}

          {/* Lede */}
          <p className="mt-10 text-base md:text-lg text-fg-muted leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bloom inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-fg hover:bg-accent-hover transition-colors text-[14px] font-semibold"
              >
                Visit live <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border-strong text-fg hover:bg-bg-elevated transition-colors text-[14px] font-semibold"
              >
                <FaGithub size={16} aria-hidden="true" /> Source
              </a>
            )}
          </div>
        </motion.header>
      </div>

      {/* Hero image — full-bleed carousel */}
      {hasCarousel ? (
        <motion.div {...fade(0.1)} className="mb-24 md:mb-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="relative slick-container-custom rounded-2xl overflow-hidden border border-border bg-bg-elevated">
              <Slider {...carouselSettings}>
                {project.carouselImages!.map((image, i) => (
                  <div
                    key={i}
                    className="outline-none"
                    onClick={() => openLightbox(i)}
                    title="Click to enlarge"
                  >
                    <div className="relative aspect-video w-full bg-bg-deep cursor-zoom-in">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 1100px"
                        quality={90}
                        priority={i === 0}
                        unoptimized
                      />
                    </div>
                    {image.caption && (
                      <p className="text-center text-sm text-fg-subtle py-4">
                        {image.caption}
                      </p>
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </motion.div>
      ) : project.imageUrl ? (
        <motion.div {...fade(0.1)} className="mb-24 md:mb-32">
          <div className="container mx-auto px-6 md:px-10">
            <div
              className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-bg-elevated cursor-zoom-in"
              onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
            >
              <Image
                src={project.imageUrl}
                alt={`${title} preview`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1100px"
                priority
                unoptimized
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="mb-24 md:mb-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden border border-border flex items-center justify-center"
              style={{ background: 'radial-gradient(ellipse at top, color-mix(in oklch, var(--accent) 22%, var(--bg-elevated)) 0%, var(--bg-deep) 70%)' }}
            >
              <span className="font-display text-fg/40 text-[12rem] leading-none select-none" style={{ letterSpacing: '-0.06em' }}>
                {title.split(' ').map(w => w.charAt(0)).slice(0, 2).join('')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={hasCarousel ? lightboxSlides : project.imageUrl ? [{ src: project.imageUrl, alt: title }] : []}
          index={lightboxIndex}
        />
      )}

      {/* Body — sticky sidebar + prose */}
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-8 md:gap-x-16 gap-y-12">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-28 space-y-8">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-3">Year</p>
                <p className="text-fg">{project.year ?? '—'}</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-3">Role</p>
                <p className="text-fg">{project.myRole}</p>
              </div>
              {project.myRoles && project.myRoles.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-3">Wearing</p>
                  <ul className="space-y-2 text-sm text-fg-muted">
                    {project.myRoles.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-3">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-2 py-1 rounded-md border border-border bg-bg-elevated/40 text-[11px] text-fg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-fg hover:text-accent transition-colors link-underline inline-flex items-center gap-1.5"
                  >
                    Visit live <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-fg-muted hover:text-fg transition-colors inline-flex items-center gap-1.5"
                  >
                    <FaGithub size={12} aria-hidden="true" /> Source on GitHub
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Prose */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-20 md:space-y-24">
            {/* Overview */}
            <motion.section {...fade(0.05)}>
              <SectionTag>Overview</SectionTag>
              <p className="text-fg-muted text-base md:text-lg leading-relaxed max-w-3xl">
                {project.longDescription}
              </p>
            </motion.section>

            {/* Pull-quote — sans, large, accent dot */}
            {project.pullQuote && (
              <motion.blockquote {...fade(0.08)} className="max-w-3xl">
                <span aria-hidden="true" className="block h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] mb-6" />
                <p className="font-display text-fg text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-balance">
                  &ldquo;{project.pullQuote}&rdquo;
                </p>
              </motion.blockquote>
            )}

            {/* Features */}
            {(hasBackend || hasFrontend) && (
              <motion.section {...fade(0.1)} className="grid md:grid-cols-2 gap-x-10 gap-y-12">
                {hasBackend && (
                  <div>
                    <SectionTag>Backend</SectionTag>
                    <ul className="space-y-3">
                      {project.backendFeatures!.map((f, i) => (
                        <li key={i} className="text-fg-muted leading-relaxed flex items-baseline gap-2.5 text-[15px]">
                          <span aria-hidden="true" className="text-accent text-xs translate-y-[-1px]">●</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasFrontend && (
                  <div>
                    <SectionTag>Frontend</SectionTag>
                    <ul className="space-y-3">
                      {project.frontendFeatures!.map((f, i) => (
                        <li key={i} className="text-fg-muted leading-relaxed flex items-baseline gap-2.5 text-[15px]">
                          <span aria-hidden="true" className="text-accent text-xs translate-y-[-1px]">●</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.section>
            )}

            {/* Challenges */}
            {project.challengesAndSolutions?.length > 0 && (
              <motion.section {...fade(0.1)}>
                <SectionTag>Challenges & decisions</SectionTag>
                <ol className="space-y-12 max-w-3xl">
                  {project.challengesAndSolutions.map((item, i) => (
                    <li key={i} className="grid grid-cols-12 gap-4">
                      <span className="col-span-2 md:col-span-1 text-[12px] font-mono text-accent pt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="col-span-10 md:col-span-11">
                        <h3 className="font-display text-fg text-xl md:text-2xl mb-3 leading-tight">
                          {item.challenge}
                        </h3>
                        <p className="text-fg-muted leading-relaxed">{item.solution}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.section>
            )}

            {/* Diagrams */}
            {project.architectureDiagramUrl && (
              <motion.figure {...fade(0.1)}>
                <SectionTag>System architecture</SectionTag>
                <div className="relative w-full rounded-xl overflow-hidden border border-border bg-bg-elevated">
                  <Image
                    src={project.architectureDiagramUrl}
                    alt={`${title} architecture diagram`}
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </motion.figure>
            )}

            {hasClassDiagram && (
              <motion.figure {...fade(0.1)}>
                <SectionTag>Class diagram</SectionTag>
                <div className="relative w-full rounded-xl overflow-hidden border border-border bg-bg-elevated">
                  <Image
                    src={project.classDiagramUrl!}
                    alt={`${title} class diagram`}
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </motion.figure>
            )}

            {hasERD && (
              <motion.figure {...fade(0.1)}>
                <SectionTag>Entity relationship diagram</SectionTag>
                <div className="relative w-full rounded-xl overflow-hidden border border-border bg-bg-elevated">
                  <Image
                    src={project.erdUrl!}
                    alt={`${title} ERD`}
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </motion.figure>
            )}

            {/* Footer nav */}
            <motion.div {...fade(0.1)} className="pt-12 border-t border-border flex flex-wrap items-center justify-between gap-6">
              <Link
                href="/projects"
                className="text-[13px] text-fg-muted hover:text-fg transition-colors inline-flex items-baseline gap-2"
              >
                <span aria-hidden="true">←</span>
                <span className="link-underline">All projects</span>
              </Link>
              <Link
                href="/contact"
                className="text-[13px] text-fg hover:text-accent transition-colors inline-flex items-baseline gap-2"
              >
                <span className="link-underline">Get in touch</span>
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetailClient;
