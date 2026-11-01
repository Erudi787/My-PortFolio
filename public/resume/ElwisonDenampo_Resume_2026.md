# ELWISON DENAMPO

elwisondenampo@gmail.com | +63 945 623 2885 | Cebu, Philippines | [Portfolio](https://erudi.vercel.app) | [Github](https://github.com/Erudi787) | [LinkedIn](https://linkedin.com/in/elwison-denampo)

---

## SKILLS

- **Backend**: TypeScript, Node.js, NestJS, Express, Prisma, Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, REST APIs, JWT Auth, Socket.IO
- **Frontend**: Next.js, React, Astro, Vite, Tailwind CSS, shadcn/ui, React Query, React Hook Form, Zod, Zustand, Framer Motion, Recharts, Technical SEO, JSON-LD
- **AWS & DevOps**: AWS CDK, Lambda, API Gateway, DynamoDB, EventBridge, S3, Amplify, Cloudflare Workers, Docker, Turborepo, pnpm, Git, CI/CD, Vercel, Render
- **Integrations**: Stripe, DocuSign, SendGrid, Supabase, Sentry, Make.com, YouTube Data API, Spotify Web API, beehiiv API, Google Search Console
- **AI/ML**: OpenAI API, Groq API, LLM Routing, Prompt Engineering
- **Other**: C#, ASP.NET Core, Entity Framework Core, SQL Server, Hangfire

---

## WORK EXPERIENCE

### FULL-STACK DEVELOPER &nbsp;&nbsp;|&nbsp;&nbsp; Dr. Rena Malik, MD &nbsp;&nbsp;|&nbsp;&nbsp; April 2026 – Present

Web development for the world's most-followed urologist (2.9M YouTube subscribers, 600M+ views) — a podcast site rebuild on AWS serverless, the commerce stack for her debut book launch, and ongoing site reliability and technical SEO.

**Rena Malik, MD Podcast** — *Astro, TypeScript, AWS CDK, Lambda, DynamoDB, EventBridge, Amplify* — https://podcast-new.renamalikmd.com/

- Built a **326-episode auto-updating static podcast site** on CDK-managed AWS serverless — a daily cron Lambda syncs the RSS feed into DynamoDB and triggers an Amplify rebuild, taking episodes **publish-to-live in under 24 hours with 0 manual deploys**
- Designed a **5-tier thumbnail resolution chain** across YouTube, Spotify and RSS sources with bounded-concurrency fetches, raising unique-artwork coverage from **86% to ~92%**

**Book Launch Commerce** — *Stripe Payment Element, Cloudflare Workers, TypeScript, WordPress, Make.com* — https://renamalikmd.com/hardtruth/

- Built a **custom Stripe Payment Element checkout** (Apple Pay / Google Pay) for a 4-tier bulk pre-order flow (**$397–$9,947**, up to 300 ship-to addresses), working around Stripe's 500-char metadata limit with a hybrid metadata / Make.com Data Store strategy
- Shipped a **~1,100-LOC Cloudflare Worker** running the book's affiliate program across three pipelines — **HMAC-signed webhooks with timing-safe verification**, Stripe signature validation, and dedupe keys so a referral can't be scored twice

**Site Reliability & Technical SEO** — *Python, SQLite, Google Search Console*

- Built a **monitoring system running 32 checks across 7 subsystems in ~15s** (pages, redirects, two Stripe checkouts, the AWS pipeline, the Worker) with SQLite history and an HTML dashboard that surfaces only on failure — backed by **48 negative tests** that caught a check passing a nonexistent stylesheet
- **Technical SEO**: cut internal redirects **733 → 152**, reduced sitewide HTML weight **−89%**, and shipped **26 numbered fixes** including a FAQ metabox driving both visible Q&A and JSON-LD schema from one field

### SOFTWARE DEVELOPER &nbsp;&nbsp;|&nbsp;&nbsp; Flatrate Bookkeeping LLC &nbsp;&nbsp;|&nbsp;&nbsp; June 2026 – August 2026

*TypeScript, TanStack Start, TanStack Router, PostgreSQL, Supabase, Row-Level Security, Postgres Triggers, Plaid*

Development, bug-fixing and maintenance on a live Supabase/Postgres + TanStack Start accounting SaaS, working an internal bug-bounty queue of client-reported issues end to end after the founder declared the feature set complete.

- Root-caused two compounding Postgres performance bugs (a self-referencing CTE re-inlined per outer row, plus a non-sargable `UUID::text` join) in a trigger firing on every bank/credit-card account mapping — diagnosed live against production with `pg_stat_activity` and `EXPLAIN ANALYZE`, cutting a reproducible **8–9s timeout to ~1s**
- Designed and shipped Group Chat, a limited-access contact tier letting third parties (e.g. a client's business partner) join in-app message threads while staying fail-closed from SMS/email/call history — threaded the new access level through all 3 invite-creation code paths, gated ~4 messaging endpoints behind a dedicated auth-middleware variant, and built the matching client-portal and staff-side invite UI
- Wrote and shipped 18 Postgres row-level-security policies closing an access-control gap in a **7-role RBAC system** (staff/client/admin/auditor/payroll/tax-contractor/customer-success)
- Established migration hygiene for the codebase — every schema/RPC change shipped with a hand-written revert script, gated by custom verification scripts (`tsc`, server-fn auth-middleware coverage, destructive-migration scanner) run before every production push

### SOFTWARE ENGINEER &nbsp;&nbsp;|&nbsp;&nbsp; FutureThink Hub & La Chow &nbsp;&nbsp;|&nbsp;&nbsp; July 2025 – May 2026

Shipped three production platforms — an AI-powered adaptive learning platform (FutureThink Edge), a unified property management SaaS (LaChowOS), and La Chow's public marketing site with a custom admin CMS — across full-stack development, database design, third-party integrations, and DevOps.

**FutureThink Edge** — *Next.js, TypeScript, FastAPI, PostgreSQL, Redis, OpenAI API* — https://www.futurethinkedge.org

- Engineered a full-stack adaptive learning platform serving 6 user roles with **86 REST API endpoints** achieving P95 latency of 29ms under load — **85% below the 200ms SLA target**
- Architected a config-driven **multi-LLM routing layer** across 4 AI providers (Gemini, DeepSeek, Grok, Claude), **reducing per-query cost ~60%** via subject-specific model selection and a <5ms pre-LLM curriculum enforcement classifier
- Scaled the backend to sustain **492 req/s under 500 concurrent users** (k6, 590K+ iterations) and built **1,870+ automated tests** (pytest, Vitest, Playwright E2E) eliminating 100% of type errors to reach Six Sigma 5.9 quality

**LaChowOS** — *Next.js 16, NestJS 11, Prisma, PostgreSQL, Stripe, Turborepo, AWS S3, Redis* — https://portal.thelachow.com/

- Architected a **Turborepo monorepo** (pnpm workspaces) shipping a NestJS 11 API with **52 feature modules**, a Next.js 16 / React 19 frontend with **62 admin + 34 tenant-portal pages**, and a shared Prisma package with **84 models** generating type-safe clients across both apps
- Designed a PostgreSQL schema with **`tsrange` exclusion constraints + GiST indexes** preventing double-booking of shared kitchen spaces at the database level, eliminating application-layer race conditions
- Integrated **9+ third-party services**: Stripe (rent + webhooks), DocuSign (eSignature lease workflows), SendGrid, AWS S3 (presigned-URL uploads + PDF parsing), QuickBooks, Supabase, Redis caching, Sentry, and DoorLoop (idempotent legacy import via `externalId` deduplication)

---

## PROJECTS

### AI.pollo — AI Mood-Based Music Recommender &nbsp;&nbsp;|&nbsp;&nbsp; https://ai-pollo.vercel.app

*React, TypeScript, Vite, FastAPI, PostgreSQL, Spotify API, Vercel*

AI-powered mood-based playlist recommender using a custom Curated Intersect Algorithm that scrapes and scores 2,000+ tracks from curated Spotify playlists against listening history and ML feedback, achieving 44% faster recommendations than deprecated endpoints.

- Engineered a 5-tier weighted scoring pipeline processing 2,000+ candidate tracks with `asyncio.gather` concurrency, **reducing recommendation latency by 44%**
- Built real-time multiplayer Spotify Blend rooms with 5-letter shortcode matchmaking and group consensus scoring, **cutting collaborative generation time by 67%**

### SchemaFlow — Interactive Schema Visualizer &nbsp;&nbsp;|&nbsp;&nbsp; https://schemaflow-pi.vercel.app

*React 19, TypeScript, Vite, React Flow, Dagre, Zustand, Zod, CodeMirror 6, TailwindCSS*

Interactive schema visualization tool that parses SQL DDL and JSON payloads into live ERD diagrams with field-level edge connections, auto-layout, and relationship labels.

- Engineered a real-time SQL DDL and JSON schema parser processing 50-table schemas in **< 2ms (~25K tables/sec)** using regex-based parsing and recursive descent
- Built a multi-format export engine generating Mermaid ERD, Markdown docs, TypeScript interfaces, and mock REST API specs at **~40K exports/sec**, enabling one-click schema documentation

---

## CERTIFICATIONS

**SEO Certification — HubSpot Academy** &nbsp;&nbsp;|&nbsp;&nbsp; Valid: Dec 2025 – Jan 2027
Demonstrated knowledge in SEO fundamentals, keyword research, ranking factors, and optimization strategies.

---

## AWARDS

**2nd Prize — Huawei ICT Competition (Network Track), Philippines (2025–2026)**

---

## EDUCATION

**Bachelor of Science in Computer Engineering (Tertiary)** &nbsp;&nbsp;|&nbsp;&nbsp; August 2022 – May 2026
Cebu Institute of Technology - University *(Cum Laude)*

**Science, Technology, Engineering, and Mathematics Strand (Secondary)** &nbsp;&nbsp;|&nbsp;&nbsp; June 2016 – July 2022
University of Cebu - Pri *(High Honors)*
