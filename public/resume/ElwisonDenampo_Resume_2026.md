# ELWISON DENAMPO

elwisondenampo@gmail.com | +63 945 623 2885 | Cebu, Philippines | [Portfolio](https://erudi.vercel.app) | [Github](https://github.com/Erudi787) | [LinkedIn](https://linkedin.com/in/elwison-denampo)

---

## SKILLS

- **Backend**: TypeScript, Node.js, NestJS, Express, Prisma, Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, REST APIs, JWT Auth, Socket.IO
- **Frontend**: Next.js, React, Astro, Vite, Tailwind CSS, shadcn/ui, React Query, React Hook Form, Zod, Zustand, Framer Motion, Recharts
- **AWS & DevOps**: AWS CDK, Lambda, API Gateway, DynamoDB, EventBridge, SSM Parameter Store, S3, Amplify, Docker, Turborepo, pnpm, Git, CI/CD, Vercel, Render
- **Integrations**: Stripe, DocuSign, SendGrid, Supabase, Sentry, Make.com, YouTube Data API, Spotify Web API
- **AI/ML**: OpenAI API, Groq API, LLM Routing, Prompt Engineering
- **Other**: C#, ASP.NET Core, Entity Framework Core, SQL Server, Hangfire

---

## WORK EXPERIENCE

### FREELANCE FULL-STACK DEVELOPER &nbsp;&nbsp;|&nbsp;&nbsp; Dr. Rena Malik, MD &nbsp;&nbsp;|&nbsp;&nbsp; Apr 2026 – Present

Web development for the world's most-followed urologist (2.9M YouTube subscribers, 600M+ views) — a podcast site rebuild on AWS serverless, a custom Stripe checkout, and a WordPress pre-order funnel for her debut book.

**Rena Malik MD Podcast** — *Astro 6, TypeScript, AWS CDK, Lambda (Node 22), DynamoDB, API Gateway, EventBridge, Amplify, SSM* — https://podcast-new.renamalikmd.com

- Built and shipped a **326-episode auto-updating static podcast site** with CDK-managed AWS infrastructure (Lambda, DynamoDB GSI for chronological queries, API Gateway HTTP API, EventBridge cron) — the entire backend reproducible from a single `cdk:deploy`
- Engineered an **auto-rebuild pipeline** — a daily cron Lambda upserts the Megaphone RSS feed into DynamoDB and POSTs to an Amplify build hook via an SSM-stored secret — taking new episodes from **publish-to-live in under 24 hours with 0 manual deploys**
- Designed a **5-tier thumbnail resolution chain** across the YouTube Data API v3, Spotify Web API, and RSS sources with bounded-concurrency parallel fetches, raising unique-artwork coverage from **86% to ~92%** while staying inside API rate limits

**The Hard Truth — Pre-Order Funnel** — *WordPress, vanilla JS, Stripe.js, Stripe Payment Element + Payment Intents, Make.com* — https://renamalikmd.com/hardtruth/

- Built a **custom Stripe Payment Element checkout** (Apple Pay / Google Pay) replacing Stripe-hosted Payment Links — a 4-tier bulk pre-order flow (**$397–$9,947**) with a `payment_intent.succeeded` webhook contract to Make.com
- Engineered a **hybrid metadata-storage strategy** for multi-address bulk orders (up to 300 ship-to addresses), working around Stripe's 500-char metadata limit via base64-CSV metadata for small orders and a Make.com Data Store keyed by Payment Intent ID for large ones

### JUNIOR SOFTWARE ENGINEER &nbsp;&nbsp;|&nbsp;&nbsp; FutureThink Hub & La Chow &nbsp;&nbsp;|&nbsp;&nbsp; July 2025 – March 2026

Shipped three production platforms — an AI-powered adaptive learning platform (FutureThink Edge), a unified property management SaaS (LaChowOS), and La Chow's public marketing site with a custom admin CMS — across full-stack development, database design, third-party integrations, and DevOps.

**FutureThink Edge** — *Next.js 15, FastAPI, PostgreSQL, Redis, OpenAI API* — https://www.futurethinkedge.org

- Engineered a full-stack adaptive learning platform serving 6 user roles with **86 REST API endpoints** achieving P95 latency of 29ms under load — **85% below the 200ms SLA target**
- Architected a config-driven **multi-LLM routing layer** across 4 AI providers (Gemini, DeepSeek, Grok, Claude), **reducing per-query cost ~60%** via subject-specific model selection and a <5ms pre-LLM curriculum enforcement classifier
- Scaled the backend to sustain **492 req/s under 500 concurrent users** (k6, 590K+ iterations) and built **1,870+ automated tests** (pytest, Vitest, Playwright E2E) eliminating 100% of type errors to reach Six Sigma 5.9 quality

**LaChowOS** — *Next.js 16, NestJS 11, Prisma, PostgreSQL, Stripe, Turborepo, AWS S3, Redis*

- Architected a **Turborepo monorepo** (pnpm workspaces) shipping a NestJS 11 API with **52 feature modules**, a Next.js 16 / React 19 frontend with **62 admin + 34 tenant-portal pages**, and a shared Prisma package with **84 models** generating type-safe clients across both apps
- Designed a PostgreSQL schema with **`tsrange` exclusion constraints + GiST indexes** preventing double-booking of shared kitchen spaces at the database level, eliminating application-layer race conditions
- Integrated **9+ third-party services**: Stripe (rent + webhooks), DocuSign (eSignature lease workflows), SendGrid, AWS S3 (presigned-URL uploads + PDF parsing), QuickBooks, Supabase, Redis caching, Sentry, and DoorLoop (idempotent legacy import via `externalId` deduplication)

**La Chow Public Site & Admin CMS** — *Next.js 16, React 19, Tailwind, Stripe, Supabase, Google Analytics Data API*

- Built a **17-page Next.js marketing site** with full SEO (`sitemap.ts`, `robots.ts`), markdown-driven blog/magazine via remark, and Stripe checkout for online ordering and tour booking, paired with a custom admin CMS with bcrypt auth and a live **Google Analytics Data API** dashboard

---

## PROJECTS

### AI.pollo — AI Mood-Based Music Recommender &nbsp;&nbsp;|&nbsp;&nbsp; https://ai-pollo.vercel.app

*React, TypeScript, Vite, FastAPI, PostgreSQL, Spotify API, Vercel*

AI-powered mood-based playlist recommender using a custom Curated Intersect Algorithm that scrapes and scores 2,000+ tracks from curated Spotify playlists against listening history and ML feedback.

- Engineered a 5-tier weighted scoring pipeline processing 2,000+ candidate tracks with `asyncio.gather` concurrency, **reducing recommendation latency by 44%**
- Built real-time multiplayer Spotify Blend rooms with 5-letter shortcode matchmaking and group consensus scoring, **cutting collaborative generation time by 67%**
- Deployed a serverless FastAPI backend on Vercel with stateless OAuth 2.0, automated Alembic migrations on cold boot, and an async background data-retention scheduler

### SchemaFlow — Interactive Schema Visualizer &nbsp;&nbsp;|&nbsp;&nbsp; https://schemaflow-pi.vercel.app

*React 19, TypeScript, Vite, React Flow, Dagre, Zustand, Zod, CodeMirror 6, TailwindCSS*

Interactive schema visualization tool that parses SQL DDL and JSON payloads into live ERD diagrams with field-level edge connections, auto-layout, and relationship labels.

- Engineered a real-time SQL DDL and JSON schema parser processing 50-table schemas in **< 2ms (~25K tables/sec)** using regex-based parsing and recursive descent
- Architected a zero-latency React Flow transformation pipeline achieving **185K transforms/sec** with Dagre auto-layout, field-level edge routing, and Zod runtime validation
- Built a multi-format export engine generating Mermaid ERD, Markdown docs, TypeScript interfaces, and mock REST API specs at **~40K exports/sec**, enabling one-click schema documentation

---

## CERTIFICATIONS

**SEO Certification — HubSpot Academy** &nbsp;&nbsp;|&nbsp;&nbsp; Valid: Dec 2025 – Jan 2027

---

## AWARDS

**2nd Prize — Huawei ICT Competition (Network Track), Philippines (2025–2026)**

---

## EDUCATION

**Bachelor of Science in Computer Engineering** &nbsp;&nbsp;|&nbsp;&nbsp; August 2022 – May 2026
Cebu Institute of Technology - University *(Cum Laude — Consistent Dean's Lister & Full Scholar)*

**Science, Technology, Engineering, and Mathematics Strand (Secondary)** &nbsp;&nbsp;|&nbsp;&nbsp; June 2016 – July 2022
