// src/components/sections/AboutSection.tsx — hybrid v3 (right-column sidebar)
'use client';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AboutSectionProps {}

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>((_props, ref) => {
  const reduce = useReducedMotion();
  const spring = { type: 'spring' as const, stiffness: 160, damping: 28, mass: 0.9 };
  const fade = (delay = 0) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, viewport: { once: true } }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { ...spring, delay },
        };

  return (
    <section
      ref={ref}
      id="about"
      className="bg-bg text-fg py-28 md:py-40 relative"
    >
      <div className="container mx-auto px-6 md:px-10">
        {/* Section tag — bracketed mono with section number */}
        <motion.p
          {...fade(0)}
          className="text-[12px] font-mono uppercase tracking-[0.22em] text-accent mb-8 inline-flex items-baseline gap-1.5"
        >
          <span aria-hidden="true">[</span>
          <span className="text-fg-muted">§ 02</span>
          <span aria-hidden="true" className="text-fg-subtle">·</span>
          <span>About</span>
          <span aria-hidden="true">]</span>
        </motion.p>

        {/* Headline — spans the left 8 cols of the grid below */}
        <motion.h2
          {...fade(0.05)}
          className="font-display text-fg text-4xl md:text-6xl lg:text-7xl mb-12 md:mb-16 max-w-4xl"
        >
          The kind of engineer who reads the migration script before agreeing to the deadline.
        </motion.h2>

        {/* Body — bio prose left, sticky sidebar right (portrait + metadata + résumé) */}
        <div className="grid grid-cols-12 gap-x-8 md:gap-x-12 gap-y-14 items-start">
          {/* LEFT: 8 / 12 — bio paragraphs in a 2-col internal grid */}
          <div className="col-span-12 md:col-span-8">
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 text-fg-muted text-base md:text-lg leading-relaxed">
              <motion.p {...fade(0.1)}>
                I&apos;m a full-stack engineer based in Cebu, Philippines. Most
                of my work lives on the backend — database schemas, service
                architecture, the API contracts that the frontend team
                eventually has to render. I learned by shipping things that
                real people use, which has the useful side-effect of making me
                allergic to half-finished work.
              </motion.p>

              <motion.p {...fade(0.15)}>
                Right now I&apos;m shipping{' '}
                <span className="text-fg font-medium">LaChowOS</span> — a
                property-management platform for culinary innovation
                facilities. Before that I built the backend for{' '}
                <Link href="/projects/futurethink-edge" className="text-fg link-underline">
                  FutureThink Edge
                </Link>
                , an AI-powered adaptive learning platform engineered for
                3,000+ concurrent users with FastAPI, Postgres, and Redis
                pooled to the gills.
              </motion.p>

              <motion.p {...fade(0.2)}>
                I lean toward boring, durable choices — exclusion constraints
                over application-layer locks, audit trails before they&apos;re
                asked for, idempotent imports so re-runs don&apos;t become
                incidents.
              </motion.p>

              <motion.p {...fade(0.25)}>
                I&apos;ll spend an afternoon getting the seed data right
                because I&apos;ve been on the wrong side of a 3am page enough
                times to know it pays back.
              </motion.p>
            </div>
          </div>

          {/* RIGHT: 4 / 12 — sticky sidebar with portrait, metadata table, résumé */}
          <motion.aside
            {...fade(0.12)}
            className="col-span-12 md:col-span-4 md:pl-4"
          >
            <div className="md:sticky md:top-28 space-y-8">
              {/* Portrait + caption */}
              <figure>
                <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden border border-border-strong bg-bg-elevated">
                  <Image
                    src="/images/profile.jpg"
                    alt="Portrait of Elwison Denampo"
                    fill
                    className="object-cover grayscale-[15%] saturate-[0.95]"
                    sizes="(max-width: 768px) 60vw, 280px"
                    priority
                  />
                  <div aria-hidden="true" className="absolute inset-1.5 border border-bg/15 pointer-events-none" />
                </div>
                <figcaption className="mt-3 font-mono text-[11px] tracking-[0.22em] uppercase text-fg-subtle inline-flex items-baseline gap-1.5">
                  <span aria-hidden="true">[</span>
                  <span className="text-fg-muted">Plate I</span>
                  <span aria-hidden="true" className="text-fg-subtle">·</span>
                  <span>Cebu, 2026</span>
                  <span aria-hidden="true">]</span>
                </figcaption>
              </figure>

              {/* At-a-glance metadata */}
              <dl className="grid grid-cols-3 gap-y-3 gap-x-4 text-sm pt-6 border-t border-border max-w-[280px]">
                <dt className="text-fg-subtle">Role</dt>
                <dd className="col-span-2 text-fg">Full-stack engineer</dd>

                <dt className="text-fg-subtle">Based</dt>
                <dd className="col-span-2 text-fg">Naga, Cebu · PH</dd>

                <dt className="text-fg-subtle">Status</dt>
                <dd className="col-span-2 text-fg">
                  <span className="inline-flex items-baseline gap-2">
                    <span aria-hidden="true" className="relative inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--signal-live)] translate-y-[1px]">
                      <span className="absolute inset-0 rounded-full bg-[color:var(--signal-live)] motion-safe:animate-ping opacity-70" />
                    </span>
                    Open to remote
                  </span>
                </dd>

                <dt className="text-fg-subtle">Awards</dt>
                <dd className="col-span-2 text-fg-muted leading-relaxed">
                  2nd Prize, Huawei ICT (PH, 2025–26)
                  <br />
                  SEO Cert., HubSpot (2025)
                </dd>
              </dl>

              {/* Résumé CTA */}
              <a
                href="/resume/ElwisonDenampo_SoftwareEngineer_Resume.pdf"
                download
                className="bloom inline-flex items-center gap-2.5 px-4 py-3 rounded-full border border-border-strong text-fg hover:bg-bg-elevated transition-colors text-[13px] font-semibold"
              >
                Download résumé
                <span className="text-[11px] font-mono text-fg-subtle">PDF</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </motion.aside>
        </div>

        {/* The single serif italic moment — page's emotional centre */}
        <motion.blockquote
          {...fade(0.3)}
          className="mt-24 md:mt-32 max-w-4xl"
        >
          <p className="font-serif text-fg text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-balance">
            &ldquo;The boring choice — chosen on purpose, twice — beats the
            clever choice almost every time.&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
