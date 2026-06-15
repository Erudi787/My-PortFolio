// src/components/sections/AboutSection.tsx — design/rei
import { Code, Server, Database, Wrench } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-3 inline-flex items-baseline gap-1.5">
            <span aria-hidden="true">[</span>
            <span className="text-muted-foreground">§ 02</span>
            <span aria-hidden="true" className="text-muted-foreground">·</span>
            <span>About</span>
            <span aria-hidden="true">]</span>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            About <span className="text-primary">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Prose column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Full-Stack Developer & Backend Specialist
            </h3>

            <p className="text-muted-foreground">
              I&apos;m a full-stack developer based in Cebu, Philippines. Most of my work
              lives on the backend — database schemas, service architecture, the API
              contracts that the frontend team eventually has to render. I learned by
              shipping things that real people use, which has the useful side-effect of
              making me allergic to half-finished work.
            </p>

            <p className="text-muted-foreground">
              I lean toward boring, durable choices — exclusion constraints over
              application-layer locks, audit trails before they&apos;re asked for,
              idempotent imports so re-runs don&apos;t become incidents. I&apos;m
              currently between roles and open to what&apos;s next.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="resume/Elwison Denampo Resume.pdf"
                download
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* 4 capability cards */}
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Backend Architecture</h4>
                  <p className="text-muted-foreground">
                    NestJS, FastAPI, ASP.NET Core. 45+ modules in production
                    monorepos with Stripe, DocuSign, AWS S3 integrations.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Database Design</h4>
                  <p className="text-muted-foreground">
                    PostgreSQL with Prisma + SQLAlchemy. Exclusion constraints,
                    Redis pooling, FERPA-grade audit logging.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Frontend Integration</h4>
                  <p className="text-muted-foreground">
                    Next.js App Router with TypeScript. shadcn/ui, React Query,
                    Tailwind v4, and the cross-app handoff patterns to match.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">DevOps & Deployment</h4>
                  <p className="text-muted-foreground">
                    Docker, Turborepo, pnpm workspaces, Render, Sentry. Zero-downtime
                    migrations with rollback paths baked in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
