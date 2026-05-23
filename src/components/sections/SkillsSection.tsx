// src/components/sections/SkillsSection.tsx — high-end v2 (hierarchy grid)
'use client';
import React, { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsData } from '../../../lib/data';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SkillsSectionProps {}

interface PrimarySkill {
  name: string;
  blurb: string;
}

/** The eight tools I'd build a production system with tomorrow. */
const PRIMARY: PrimarySkill[] = [
  { name: 'TypeScript',  blurb: 'End-to-end type safety, every project' },
  { name: 'Next.js',     blurb: 'App router, RSC, edge-aware deployments' },
  { name: 'NestJS',      blurb: 'Modular monolith done right' },
  { name: 'FastAPI',     blurb: 'Lean Python services that actually scale' },
  { name: 'PostgreSQL',  blurb: 'Exclusion constraints, partial indexes, GiST' },
  { name: 'Prisma',      blurb: 'Type-safe data access, migrations as code' },
  { name: 'React',       blurb: 'Server components, suspense, react-query' },
  { name: 'Stripe',      blurb: 'Payments + webhooks + reconciliation' },
];

const PRIMARY_SET = new Set(PRIMARY.map(p => p.name));

const SECONDARY_GROUPS: { label: string; names: string[] }[] = [
  { label: 'Languages',     names: ['JavaScript', 'Python', 'C#', 'Dart', 'Swift', 'C', 'C++', 'HTML5', 'CSS3'] },
  { label: 'Frameworks',    names: ['ASP.NET Core', 'Express.js', 'Node.js', 'Flutter', 'Vite', 'React Query', 'React Flow', 'Framer Motion', 'shadcn/ui', 'Zustand', 'Tailwind CSS'] },
  { label: 'Data',          names: ['Supabase', 'SQL Server', 'MySQL', 'Firebase', 'Redis', 'SQLAlchemy', 'AutoMapper', 'MSAccess'] },
  { label: 'Infra & tools', names: ['AWS S3', 'Render', 'Docker', 'Turborepo', 'pnpm', 'Sentry', 'Git & GitHub', 'Jira', 'VS Code'] },
  { label: 'Integrations',  names: ['DocuSign', 'SendGrid', 'Clerk', 'OpenAI API', 'Groq API', 'Socket.IO', 'WebSocket', 'Zod', 'GraphQL', 'REST APIs', 'JWT Auth', 'Spotify API', 'Spotipy', 'FullCalendar', 'Recharts'] },
];

const knownNames = new Set(skillsData.map(s => s.name));

const SkillsSection = forwardRef<HTMLElement, SkillsSectionProps>((_props, ref) => {
  const reduce = useReducedMotion();
  const spring = { type: 'spring' as const, stiffness: 160, damping: 28, mass: 0.9 };
  const fade = (delay = 0) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, viewport: { once: true } }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { ...spring, delay },
        };

  return (
    <section
      ref={ref}
      id="skills"
      className="bg-bg text-fg py-28 md:py-40 border-t border-border relative"
    >
      <div className="container mx-auto px-6 md:px-10">
        {/* Section tag — bracketed mono with section number */}
        <motion.p
          {...fade(0)}
          className="text-[12px] font-mono uppercase tracking-[0.22em] text-accent mb-8 inline-flex items-baseline gap-1.5"
        >
          <span aria-hidden="true">[</span>
          <span className="text-fg-muted">§ 03</span>
          <span aria-hidden="true" className="text-fg-subtle">·</span>
          <span>Stack</span>
          <span aria-hidden="true">]</span>
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fade(0.05)}
          className="font-display text-fg max-w-4xl text-4xl md:text-5xl lg:text-6xl mb-6"
        >
          The eight I&apos;d build with{' '}
          <span className="font-serif text-fg-muted">tomorrow</span>.
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-fg-muted text-base md:text-lg max-w-xl mb-16 md:mb-20">
          Tools I&apos;ve shipped production with — not the full list, just the
          shortlist for picking up a clean slate.
        </motion.p>

        {/* Primary tier — large hierarchical cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-20">
          {PRIMARY.map((tool, i) => (
            <motion.div
              key={tool.name}
              {...fade(0.1 + i * 0.03)}
              className="group relative p-6 rounded-xl border border-border bg-bg-elevated/40 hover:bg-bg-elevated hover:border-border-strong transition-colors overflow-hidden"
            >
              {/* Accent line that lights up on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <p className="font-display text-fg text-2xl md:text-[1.75rem] tracking-[-0.02em] leading-none">
                {tool.name}
              </p>
              <p className="mt-4 text-[13px] text-fg-muted leading-snug">
                {tool.blurb}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Secondary tier — quieter compact grid */}
        <motion.div {...fade(0.3)} className="border-t border-border pt-12 md:pt-16">
          <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-10">
            Also fluent in
          </p>

          <div className="space-y-8">
            {SECONDARY_GROUPS.map((group) => {
              const items = group.names.filter(n => knownNames.has(n) && !PRIMARY_SET.has(n));
              if (items.length === 0) return null;
              return (
                <div key={group.label} className="grid grid-cols-12 gap-4 md:gap-6">
                  <p className="col-span-12 md:col-span-3 text-[13px] text-fg-subtle">
                    {group.label}
                  </p>
                  <div className="col-span-12 md:col-span-9 flex flex-wrap gap-2">
                    {items.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-bg-elevated/30 text-[13px] text-fg hover:border-border-strong transition-colors"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-12 text-sm text-fg-subtle">
            Always picking up the next thing — currently studying edge runtimes
            and DX-first build tooling.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
