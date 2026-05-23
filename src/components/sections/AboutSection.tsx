// src/components/sections/AboutSection.tsx — high-end v2
'use client';
import React, { forwardRef } from 'react';
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

        {/* Headline */}
        <motion.h2
          {...fade(0.05)}
          className="font-display text-fg max-w-5xl text-4xl md:text-6xl lg:text-7xl mb-20 md:mb-24"
        >
          The kind of engineer who reads the migration script before agreeing to the deadline.
        </motion.h2>

        {/* Two narrow columns of bio */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl text-fg-muted text-base md:text-lg leading-relaxed">
          <motion.p {...fade(0.1)}>
            I&apos;m a full-stack engineer based in Cebu, Philippines. Most of
            my work lives on the backend — database schemas, service
            architecture, the API contracts that the frontend team eventually
            has to render. I learned by shipping things that real people use,
            which has the useful side-effect of making me allergic to
            half-finished work.
          </motion.p>

          <motion.p {...fade(0.15)}>
            Right now I&apos;m shipping{' '}
            <span className="text-fg font-medium">LaChowOS</span> — a
            property-management platform for culinary innovation facilities.
            Before that I built the backend for{' '}
            <Link href="/projects/futurethink-edge" className="text-fg link-underline">
              FutureThink Edge
            </Link>
            , an AI-powered adaptive learning platform engineered for 3,000+
            concurrent users with FastAPI, Postgres, and Redis pooled to the
            gills.
          </motion.p>

          <motion.p {...fade(0.2)}>
            I lean toward boring, durable choices — exclusion constraints over
            application-layer locks, audit trails before they&apos;re asked
            for, idempotent imports so re-runs don&apos;t become incidents.
          </motion.p>

          <motion.p {...fade(0.25)}>
            I&apos;ll spend an afternoon getting the seed data right because
            I&apos;ve been on the wrong side of a 3am page enough times to
            know it pays back.
          </motion.p>
        </div>

        {/* The single serif italic moment — page's emotional centre */}
        <motion.blockquote
          {...fade(0.3)}
          className="my-24 md:my-32 max-w-4xl"
        >
          <p className="font-serif text-fg text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-balance">
            &ldquo;The boring choice — chosen on purpose, twice — beats the
            clever choice almost every time.&rdquo;
          </p>
        </motion.blockquote>

        {/* At-a-glance + resume CTA */}
        <motion.div {...fade(0.35)} className="grid md:grid-cols-2 gap-x-12 gap-y-12 max-w-5xl">
          <dl className="grid grid-cols-3 gap-y-3 gap-x-4 text-sm">
            <dt className="text-fg-subtle">Role</dt>
            <dd className="col-span-2 text-fg">Full-stack engineer</dd>

            <dt className="text-fg-subtle">Based</dt>
            <dd className="col-span-2 text-fg">Naga, Cebu · PH · GMT+8</dd>

            <dt className="text-fg-subtle">Status</dt>
            <dd className="col-span-2 text-fg">
              <span className="inline-flex items-baseline gap-2">
                <span aria-hidden="true" className="relative inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--signal-live)] translate-y-[1px]">
                  <span className="absolute inset-0 rounded-full bg-[color:var(--signal-live)] motion-safe:animate-ping opacity-70" />
                </span>
                Open to remote roles
              </span>
            </dd>

            <dt className="text-fg-subtle">Highlights</dt>
            <dd className="col-span-2 text-fg-muted leading-relaxed">
              2nd Prize, Huawei ICT Competition (PH, 2025–26)
              <br />
              SEO Certification, HubSpot Academy (2025)
            </dd>
          </dl>

          <div className="flex md:justify-end">
            <a
              href="/resume/ElwisonDenampo_SoftwareEngineer_Resume.pdf"
              download
              className="bloom inline-flex items-center gap-3 px-5 py-3 rounded-full border border-border-strong text-fg hover:bg-bg-elevated transition-colors text-[14px] font-semibold self-start"
            >
              Download résumé
              <span className="text-[11px] font-mono text-fg-subtle">PDF · 2026</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
