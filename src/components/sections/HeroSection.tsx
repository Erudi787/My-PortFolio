// src/components/sections/HeroSection.tsx — high-end v2 (Linear/Vercel DNA)
'use client';
import React, { forwardRef, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeroSectionProps {}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>((_props, ref) => {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on the product mockup — moves slower than scroll, scales down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%']);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [3, reduce ? 3 : 0]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.4]);

  // Smoother spring than editorial — Linear's signature easing
  const spring = { type: 'spring' as const, stiffness: 160, damping: 28, mass: 0.9 };

  const fade = (delay = 0) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { ...spring, delay },
        };

  return (
    <section
      ref={ref}
      id="home"
      className="relative bg-bg text-fg overflow-hidden"
    >
      <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16">
        {/* Background — subtle iris glow + dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] max-w-[1100px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse, color-mix(in oklch, var(--accent) 18%, transparent) 0%, transparent 55%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="container mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center text-center">
          {/* Availability pill */}
          <motion.div
            {...fade(0)}
            className="inline-flex items-center gap-2.5 mb-10 px-3.5 py-1.5 rounded-full border border-border bg-bg-elevated/60 backdrop-blur-md text-[12px] font-medium text-fg-muted"
          >
            <span aria-hidden="true" className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--signal-live)]">
              <span className="absolute inset-0 rounded-full bg-[color:var(--signal-live)] motion-safe:animate-ping opacity-70" />
            </span>
            Available for remote roles
            <span className="text-fg-subtle">·</span>
            <span className="text-fg-subtle">Cebu, GMT+8</span>
          </motion.div>

          {/* Massive sans headline */}
          <motion.h1
            {...fade(0.08)}
            className="font-display text-fg max-w-5xl text-[3.25rem] sm:text-7xl md:text-[5.5rem] lg:text-[7rem]"
          >
            Software companies stake their
            {' '}
            <span className="font-serif text-fg-muted">reputation</span>
            {' '}
            on.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fade(0.18)}
            className="mt-8 max-w-2xl text-base md:text-lg text-fg-muted leading-relaxed"
          >
            I&apos;m{' '}
            <span className="text-fg font-medium">Elwison Denampo</span>
            , a full-stack engineer specialising in backend architecture and the
            systems that hold up when no one is watching.
          </motion.p>

          {/* Twin CTAs */}
          <motion.div
            {...fade(0.28)}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/projects"
              className="bloom inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-fg hover:bg-accent-hover transition-colors text-[14px] font-semibold"
            >
              See selected work
              <span aria-hidden="true" className="text-base">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border-strong text-fg hover:bg-bg-elevated transition-colors text-[14px] font-semibold"
            >
              Get in touch
            </Link>
          </motion.div>

          {/* Product mockup — tilted browser window with parallax */}
          <motion.div
            style={{
              y: mockupY,
              scale: mockupScale,
              rotate: mockupRotate,
              opacity: mockupOpacity,
            }}
            {...fade(0.4)}
            className="mt-20 md:mt-28 w-full max-w-[1100px] origin-center"
          >
            <div className="relative">
              {/* Glow underneath */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at bottom, color-mix(in oklch, var(--accent) 35%, transparent) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                }}
              />
              {/* Browser window */}
              <div className="relative rounded-2xl overflow-hidden border border-border-strong bg-bg-elevated shadow-2xl">
                {/* Chrome bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-deep">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-fg-subtle/30" />
                    <span className="h-3 w-3 rounded-full bg-fg-subtle/30" />
                    <span className="h-3 w-3 rounded-full bg-fg-subtle/30" />
                  </div>
                  <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-bg-elevated border border-border text-[11px] font-mono text-fg-subtle truncate">
                    futurethinkedge.org / dashboard
                  </div>
                  <span className="text-[10px] font-mono text-fg-subtle hidden sm:inline">
                    LIVE
                  </span>
                </div>
                {/* Screenshot */}
                <div className="relative aspect-[16/9.5] bg-bg-deep">
                  <Image
                    src="/images/futurethink_dashboard.png"
                    alt="FutureThink Edge dashboard"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 1100px"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          {...fade(0.6)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.32em] uppercase text-fg-subtle"
        >
          <span>Scroll</span>
          <motion.span
            aria-hidden="true"
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-3 w-px bg-fg-subtle"
          />
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
