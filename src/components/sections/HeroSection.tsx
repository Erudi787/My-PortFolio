// src/components/sections/HeroSection.tsx — design/rei
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import PacmanGame from '@/components/PacmanGame';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-24 md:py-12"
    >
      <div className="container max-w-6xl mx-auto z-10 grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
        {/* LEFT — text + inline avatar */}
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-16 h-16 rounded-full bg-muted/30 border-2 border-primary flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/images/profile.jpg"
                alt="Portrait of Elwison Denampo"
                width={64}
                height={64}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              [ § 01 · Hero ]
            </span>
          </div>

          <h1 className="text-4xl font-bold md:text-6xl tracking-tight leading-tight">
            <span className="animate-fade-in">Hi! I&apos;m</span>{' '}
            <span className="text-primary animate-fade-in-delay-1">Elwison</span>{' '}
            <span className="text-gradient ml-2 animate-fade-in-delay-2">Denampo</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 animate-fade-in-delay-3">
            A full-stack developer passionate about backend architecture, scalable systems,
            and shipping production-grade software. I enjoy building things that hold up
            when no one is watching, and continuously learning to grow as a developer.
          </p>

          <div className="animate-fade-in-delay-4 pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2 rounded-full border border-border text-foreground hover:border-primary/60 hover:text-primary transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* RIGHT — Pacman game */}
        <div className="flex justify-center md:justify-end animate-fade-in-delay-3">
          <PacmanGame cellSize={14} />
        </div>
      </div>

      {/* Scroll affordance */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground m-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
}
