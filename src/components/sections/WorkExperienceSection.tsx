// src/components/sections/WorkExperienceSection.tsx — design/rei (new)
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
}

// Draft from project data — please verify dates/titles before shipping.
const experiences: Experience[] = [
  {
    id: 3,
    title: 'Full-Stack Developer (Freelance)',
    company: 'Dr. Rena Malik, MD',
    location: 'Remote · PH',
    period: 'Apr 2026 — Present',
    description: [
      'Built and shipped a 326-episode static podcast site (Astro + AWS CDK Lambda/DynamoDB/Amplify) replacing the existing third-party hosted page. CDK-managed infra is reproducible from a single `cdk:deploy` — 4 Lambdas, DynamoDB with chronology GSI, HTTP API + CORS, EventBridge cron.',
      'Engineered an auto-rebuild pipeline via SSM Parameter Store: a daily cron Lambda upserts the RSS feed to DynamoDB then POSTs to an Amplify build webhook — new episodes go publish-to-live in under 24 hours with zero human action.',
      'Designed a 5-tier per-episode thumbnail resolution chain (YouTube Data API v3 → Spotify Web API → RSS itunes:image → Spotify embed-page scrape → show cover) — raised cover coverage from ~86% to ~92% of 326 episodes by combining platform-specific APIs with a parallel-fetched fallback scrape.',
      'Built a custom Stripe Payment Element checkout replacing Stripe-hosted Payment Links — 4-tier BUPP system ($397–$9,947) with Apple Pay / Google Pay, multi-step shipping intents (individual / single / donate-some / donate-all), and a hybrid Make.com Data Store fallback for the 500-char Stripe metadata cap on Diamond-tier 300-copy orders.',
      'Delivered a WordPress + Elementor + WPCode snippet suite for the book pre-order funnel — $608+ bonus stack, vanilla-JS infinite-loop carousel for 13 endorsers with credential-verified billing (caught DO-vs-MD on multiple endorsers), and a redesigned Podcast Appearances page.',
      'Shipped a ~1,100-LOC Cloudflare Worker running the affiliate referral program across three pipelines — HMAC-signed webhooks verified with timing-safe comparison, Stripe signature validation, receipt details read server-side from the beehiiv API rather than trusted from the browser, and dedupe keys so a referral cannot be scored twice.',
      'Built a stdlib-only Python monitoring system covering 7 subsystems (WordPress pages, redirects, two Stripe checkouts, the AWS podcast pipeline, the Cloudflare Worker, snippet integrity) — 32 checks in ~15s, SQLite run history, a self-contained HTML dashboard with incident timeline and flaky-check detection, and a scheduled task that stays silent when clean and surfaces the dashboard only on failure.',
      'Wrote 48 negative tests asserting every check can actually fail — which caught a false pass where a missing stylesheet answers 302 to an HTML fallback, so "status 200 and non-empty" passed a completely dead CSS file.',
      'Technical SEO: cut internal redirects 733 → 152, reduced sitewide HTML weight −89%, and shipped 26 numbered fixes including a WordPress FAQ metabox driving both the visible Q&A and its JSON-LD schema from a single field.',
    ],
    tags: ['TypeScript', 'Astro', 'AWS CDK', 'AWS Lambda', 'DynamoDB', 'Amplify Hosting', 'Cloudflare Workers', 'Stripe', 'WordPress', 'Python', 'SQLite', 'YouTube API', 'Spotify API', 'Make.com'],
  },
  {
    id: 4,
    title: 'Software Developer',
    company: 'Flat Rate Bookkeeping',
    location: 'Remote · PH',
    period: 'Jun 2026 — Aug 2026',
    description: [
      'Took over bug-fixing and maintenance on a live Supabase/Postgres + TanStack Start accounting SaaS after its feature set was declared complete, working an internal bug-bounty queue of client-reported issues end to end.',
      'Root-caused two compounding Postgres performance bugs (a self-referencing CTE being re-inlined per outer row, plus a non-sargable UUID::text join) inside a trigger that ran on every bank/credit-card account mapping — diagnosed live against production with pg_stat_activity and EXPLAIN ANALYZE, cutting a reproducible 8–9s timeout to ~1s.',
      'Designed and shipped Group Chat, a limited-access contact tier letting third parties (e.g. a client\'s business partner) join in-app message threads while staying fail-closed from SMS/email/call history — threaded the new access level through all 3 invite-creation code paths, gated ~4 messaging endpoints behind a dedicated auth-middleware variant, and built the matching client-portal and staff-side invite UI.',
      'Wrote and shipped 18 Postgres row-level-security policies closing a residual access-control gap the new limited-contact tier opened up across a 7-role RBAC system (staff/client/admin/auditor/payroll/tax-contractor/customer-success).',
      'Established migration hygiene for the codebase: every schema/RPC change shipped with a hand-written revert script, gated by custom verification scripts (tsc, server-fn auth-middleware coverage, destructive-migration scanner) run before every production push.',
    ],
    tags: ['TypeScript', 'TanStack Start', 'TanStack Router', 'PostgreSQL', 'Supabase', 'Row-Level Security', 'Postgres Triggers', 'Plaid'],
  },
  {
    id: 1,
    title: 'Software Engineer',
    company: 'La Chow',
    location: 'Remote · PH',
    period: '2026 (resigned)',
    description: [
      'Built LaChowOS — a property-management platform for La Chow’s mixed-use culinary innovation facilities — as a Turborepo monorepo with a NestJS backend (45+ feature modules) and a Next.js App Router frontend hosting dual admin and tenant portals.',
      'Wired 10+ third-party integrations directly into the platform: Stripe (rent collection + webhooks), DocuSign (digital lease eSignatures), SendGrid (transactional email), AWS S3 (presigned upload URLs), ButterflyMX (access control), QuickBooks (accounting sync), TransUnion SmartMove (tenant screening).',
      'Designed a PostgreSQL schema with exclusion constraints + GiST indexes to prevent double-booking of shared kitchen spaces at the database layer.',
      'Integrated the cross-app handoff between the public marketing site (thelachow.com) and the authenticated tenant portal (portal.thelachow.com).',
    ],
    tags: ['TypeScript', 'NestJS', 'Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'DocuSign', 'AWS S3', 'Turborepo'],
  },
  {
    id: 2,
    title: 'Junior Software Engineer',
    company: 'FutureThink Edge',
    location: 'Remote · PH',
    period: '2025',
    description: [
      'Built 40+ FastAPI endpoints for an AI-powered adaptive learning platform engineered for 3,000+ concurrent users (students, teachers, parents, admins, organisations).',
      'Designed 42+ SQLAlchemy ORM models supporting complex role-based relationships; authored 25+ database migration scripts for zero-downtime production deployments.',
      'Implemented Redis caching with multiple cache layers and JWT-based RBAC across 5 user types; built a WebSocket server with room-based broadcasting for real-time collaboration.',
      'Integrated 3 AI providers (OpenAI, Groq, Google Gemini) behind an orchestration layer that picks providers based on availability, cost, and latency.',
    ],
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSocket', 'JWT', 'OpenAI', 'Render', 'Sentry'],
  },
];

export default function WorkExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3 inline-flex items-baseline gap-1.5">
            <span aria-hidden="true">[</span>
            <span className="text-muted-foreground">§ 03</span>
            <span aria-hidden="true" className="text-muted-foreground">·</span>
            <span>Experience</span>
            <span aria-hidden="true">]</span>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Building real-world systems that ship to real users.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="gradient-border p-6 card-hover">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 shrink-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-primary text-glow">
                      {exp.title}
                    </h3>
                    <p className="text-lg font-medium text-foreground">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-muted-foreground text-sm md:text-right md:shrink-0">
                  <div className="flex items-center gap-2 md:justify-end">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="text-muted-foreground text-left space-y-2 mb-4 ml-4">
                {exp.description.map((item, idx) => (
                  <li
                    key={idx}
                    className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground transition-shadow duration-300 hover:text-primary hover:shadow-[0_0_10px_hsl(var(--primary))]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
