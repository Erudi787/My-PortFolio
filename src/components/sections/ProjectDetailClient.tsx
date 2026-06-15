// src/components/sections/ProjectDetailClient.tsx — design/rei (lean port)
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import { Project } from '../../../lib/data';

interface ProjectDetailClientProps {
  project: Project;
}

function shortTitle(title: string): string {
  for (const sep of [' — ', ' – ', ' - ']) {
    const idx = title.indexOf(sep);
    if (idx > 0) return title.slice(0, idx);
  }
  return title;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const title = shortTitle(project.title);
  const hasCarousel = !!project.carouselImages && project.carouselImages.length > 0;
  const lightboxSlides = project.carouselImages?.map((img) => ({ src: img.src, alt: img.alt, title: img.caption })) ?? [];
  const activeImage = hasCarousel ? project.carouselImages![activeIdx] : null;

  return (
    <article className="text-foreground min-h-screen pt-28 md:pt-32 pb-24 relative">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-10" aria-label="Breadcrumb">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">{title}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-medium border border-border rounded-full bg-secondary text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cosmic-button inline-flex items-center gap-2"
              >
                <ExternalLink size={16} /> Visit Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 inline-flex items-center gap-2"
              >
                <FaGithub size={16} /> Source
              </a>
            )}
          </div>
        </header>

        {/* Gallery — hero image + thumbnail strip. Click hero to open lightbox,
            click a thumb to swap the hero. */}
        {hasCarousel && activeImage ? (
          <div className="mb-16">
            <button
              type="button"
              onClick={() => { setLightboxIndex(activeIdx); setLightboxOpen(true); }}
              aria-label={`Open ${activeImage.alt} fullscreen`}
              className="group relative block w-full aspect-video rounded-xl overflow-hidden border border-border bg-secondary/30 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 900px"
                quality={90}
                priority
                unoptimized
              />
              <span className="absolute bottom-3 right-3 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-[0.2em] bg-background/70 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Click to zoom
              </span>
            </button>

            {activeImage.caption && (
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {activeImage.caption}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
              <div
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-thin"
                role="tablist"
                aria-label="Project screenshots"
              >
                {project.carouselImages!.map((image, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <button
                      key={image.src}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`View screenshot ${i + 1}: ${image.alt}`}
                      onClick={() => setActiveIdx(i)}
                      className={`relative shrink-0 w-24 md:w-28 aspect-video rounded-md overflow-hidden border snap-start transition-all ${
                        isActive
                          ? 'border-primary ring-2 ring-primary/40 opacity-100'
                          : 'border-border opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="120px"
                        unoptimized
                      />
                    </button>
                  );
                })}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground whitespace-nowrap tabular-nums">
                {String(activeIdx + 1).padStart(2, '0')} / {String(project.carouselImages!.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        ) : project.imageUrl ? (
          <div
            className="relative aspect-video w-full mb-16 gradient-border overflow-hidden cursor-zoom-in"
            onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
          >
            <Image
              src={project.imageUrl}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
              unoptimized
            />
          </div>
        ) : null}

        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={hasCarousel ? lightboxSlides : project.imageUrl ? [{ src: project.imageUrl, alt: title }] : []}
            index={lightboxIndex}
          />
        )}

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-primary">Overview</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {project.longDescription}
          </p>
        </section>

        {/* Role */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-primary">My Role</span>
          </h2>
          <p className="text-foreground text-lg font-medium mb-4">{project.myRole}</p>
          {project.myRoles && project.myRoles.length > 0 && (
            <ul className="space-y-2 text-muted-foreground">
              {project.myRoles.map((r, i) => (
                <li key={i} className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-primary">
                  {r}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Backend + Frontend features */}
        {(project.backendFeatures?.length || project.frontendFeatures?.length) ? (
          <section className="mb-12 grid md:grid-cols-2 gap-10">
            {project.backendFeatures?.length ? (
              <div>
                <h2 className="text-xl font-bold mb-4"><span className="text-primary">Backend</span></h2>
                <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                  {project.backendFeatures.map((f, i) => (
                    <li key={i} className="relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-primary">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.frontendFeatures?.length ? (
              <div>
                <h2 className="text-xl font-bold mb-4"><span className="text-primary">Frontend</span></h2>
                <ul className="space-y-2 text-muted-foreground text-sm md:text-base">
                  {project.frontendFeatures.map((f, i) => (
                    <li key={i} className="relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-primary">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        {/* Challenges — numbered editorial. Each entry: mono numeric kicker
            (01, 02…), the challenge as a subhead, solution as flowing prose
            beneath. Thin primary left-rule marks the start of each entry. */}
        {project.challengesAndSolutions?.length ? (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8">
              <span className="text-primary">Challenges</span>
              <span className="text-muted-foreground"> & </span>
              <span className="text-primary">Solutions</span>
            </h2>

            <div className="space-y-12">
              {project.challengesAndSolutions.map((item, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-[auto_1fr] gap-x-8 gap-y-2 pl-5 border-l-2 border-primary/40"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground pt-1 md:min-w-[5.5rem]">
                    <span className="text-primary">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mx-2 opacity-50">—</span>
                    Challenge
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug">
                    {item.challenge}
                  </h3>

                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground pt-1 md:min-w-[5.5rem]">
                    <span className="opacity-50">↳</span>
                    <span className="ml-2">Solution</span>
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Diagrams */}
        {project.architectureDiagramUrl && (
          <figure className="mb-12">
            <h2 className="text-2xl font-bold mb-4"><span className="text-primary">Architecture</span></h2>
            <div className="gradient-border p-2 overflow-hidden">
              <Image src={project.architectureDiagramUrl} alt={`${title} architecture diagram`} width={1200} height={675} className="w-full h-auto" unoptimized />
            </div>
          </figure>
        )}
        {project.classDiagramUrl && (
          <figure className="mb-12">
            <h2 className="text-2xl font-bold mb-4"><span className="text-primary">Class Diagram</span></h2>
            <div className="gradient-border p-2 overflow-hidden">
              <Image src={project.classDiagramUrl} alt={`${title} class diagram`} width={1200} height={675} className="w-full h-auto" unoptimized />
            </div>
          </figure>
        )}
        {project.erdUrl && (
          <figure className="mb-12">
            <h2 className="text-2xl font-bold mb-4"><span className="text-primary">Entity Relationship Diagram</span></h2>
            <div className="gradient-border p-2 overflow-hidden">
              <Image src={project.erdUrl} alt={`${title} ERD`} width={1200} height={675} className="w-full h-auto" unoptimized />
            </div>
          </figure>
        )}

        {/* Footer nav */}
        <footer className="pt-10 mt-10 border-t border-border flex flex-wrap items-center justify-between gap-6">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to projects
          </Link>
          <Link href="/#contact" className="cosmic-button">
            Get in touch
          </Link>
        </footer>
      </div>
    </article>
  );
}
