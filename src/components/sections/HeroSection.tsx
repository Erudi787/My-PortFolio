// src/components/sections/HeroSection.tsx — design/rei
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          {/* Large circular portrait */}
          <div className="mx-auto mb-6 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-muted/30 border-4 border-primary flex items-center justify-center overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="Portrait of Elwison Denampo"
                width={160}
                height={160}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
          </div>

          {/* Multi-stage fade-in headline */}
          <h1 className="text-4xl font-bold md:text-6xl tracking-tight">
            <span className="animate-fade-in">Hi! I&apos;m</span>{' '}
            <span className="text-primary animate-fade-in-delay-1">Elwison</span>{' '}
            <span className="text-gradient ml-2 animate-fade-in-delay-2">Denampo</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay-3">
            A full-stack developer passionate about backend architecture, scalable systems,
            and shipping production-grade software. I enjoy building things that hold up
            when no one is watching, and continuously learning to grow as a developer.
          </p>

          <div className="animate-fade-in-delay-4 pt-2">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
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
