// src/components/sections/ProjectDetailClient.tsx — design/rei (lean port)
'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import { Project } from '../../../lib/data';

interface ProjectDetailClientProps {
  project: Project;
}

const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div className="aspect-video w-full bg-secondary/30 animate-pulse rounded-lg" />,
});

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <button
    onClick={onClick}
    aria-label="Previous slide"
    disabled={className?.includes('slick-disabled')}
    className={`${className?.includes('slick-disabled') ? 'opacity-30 cursor-not-allowed' : ''} absolute top-1/2 -translate-y-1/2 left-3 z-10 p-2 rounded-full bg-card/90 backdrop-blur-sm border border-border text-foreground hover:bg-card transition-colors`}
  >
    <ChevronLeft size={18} />
  </button>
);

const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <button
    onClick={onClick}
    aria-label="Next slide"
    disabled={className?.includes('slick-disabled')}
    className={`${className?.includes('slick-disabled') ? 'opacity-30 cursor-not-allowed' : ''} absolute top-1/2 -translate-y-1/2 right-3 z-10 p-2 rounded-full bg-card/90 backdrop-blur-sm border border-border text-foreground hover:bg-card transition-colors`}
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

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const title = shortTitle(project.title);
  const hasCarousel = !!project.carouselImages && project.carouselImages.length > 0;
  const lightboxSlides = project.carouselImages?.map((img) => ({ src: img.src, alt: img.alt, title: img.caption })) ?? [];

  const carouselSettings = {
    dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1,
    autoplay: false, pauseOnHover: true, adaptiveHeight: true, arrows: true,
    nextArrow: <NextArrow />, prevArrow: <PrevArrow />,
    dotsClass: 'slick-dots custom-dots-styling',
  };

  return (
    <article className="bg-background text-foreground min-h-screen pt-28 md:pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-10" aria-label="Breadcrumb">
          <Link
            href="/#projects"
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

        {/* Carousel */}
        {hasCarousel ? (
          <div className="slick-container-custom mb-16 gradient-border overflow-hidden">
            <Slider {...carouselSettings}>
              {project.carouselImages!.map((image, i) => (
                <div key={i} className="outline-none" onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}>
                  <div className="relative aspect-video w-full bg-secondary/30 cursor-zoom-in">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 900px"
                      quality={90}
                      priority={i === 0}
                      unoptimized
                    />
                  </div>
                  {image.caption && (
                    <p className="text-center text-sm text-muted-foreground py-4">{image.caption}</p>
                  )}
                </div>
              ))}
            </Slider>
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

        {/* Challenges */}
        {project.challengesAndSolutions?.length ? (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6"><span className="text-primary">Challenges & Solutions</span></h2>
            <div className="space-y-6">
              {project.challengesAndSolutions.map((item, i) => (
                <div key={i} className="gradient-border p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.challenge}</h3>
                  <p className="text-muted-foreground">{item.solution}</p>
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
