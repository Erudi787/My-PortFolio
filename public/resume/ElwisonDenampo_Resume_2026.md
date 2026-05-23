# ELWISON DENAMPO

elwisondenampo@gmail.com | +63 945 623 2885 | Cebu, Philippines | [Portfolio](https://erudi.vercel.app) | [Github](https://github.com/Erudi787) | [LinkedIn](https://linkedin.com/in/elwison-denampo)

---

## SKILLS

- **Backend**: TypeScript, Node.js, NestJS, Express, Prisma, Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, REST APIs, JWT Auth, Socket.IO
- **Frontend**: Next.js, React, Vite, Tailwind CSS, shadcn/ui, React Query, React Hook Form, Zod, Zustand, Framer Motion, Recharts
- **DevOps & Integrations**: Docker, Turborepo, pnpm, Git, CI/CD, Vercel, Render, AWS S3, Supabase, Sentry, Stripe, DocuSign, SendGrid
- **AI/ML**: OpenAI API, Groq API, LLM Routing, Prompt Engineering
- **Other**: C#, ASP.NET Core, Entity Framework Core, SQL Server, Hangfire

---

## WORK EXPERIENCE

### JUNIOR SOFTWARE ENGINEER &nbsp;&nbsp;|&nbsp;&nbsp; FutureThink Hub & La Chow &nbsp;&nbsp;|&nbsp;&nbsp; July 2025 – March 2026

Shipped three production platforms — an AI-powered adaptive learning platform (FutureThink Edge), a unified property management SaaS (LaChowOS), and La Chow's public marketing site with a custom admin CMS — across full-stack development, database design, third-party integrations, and DevOps.

**FutureThink Edge** — *Next.js 15, FastAPI, PostgreSQL, Redis, OpenAI API* — https://www.futurethinkedge.org

Production EdTech platform with multi-role portals, real-time collaboration, gamification, and AI-powered adaptive learning.

- Engineered a full-stack adaptive learning platform serving 6 user roles with 86 REST API endpoints achieving P95 latency of 29ms under load — **85% below the 200ms SLA target**
- Architected a config-driven multi-LLM routing layer across 4 AI providers (Gemini, DeepSeek, Grok, Claude), **reducing per-query cost ~60%** via subject-specific model selection and a <5ms pre-LLM curriculum enforcement classifier
- Implemented a mental-health ML ensemble (RoBERTa + VADER + TextBlob) with real-time crisis detection and 988-Lifeline escalation, achieving **FERPA/GDPR/COPPA compliance** across 7 data-protection endpoints with 0 high-severity CVEs
- Scaled backend to sustain **492 req/s under 500 concurrent users** (k6 stress test, 590K+ iterations) and built **1,870+ automated tests** (pytest, Vitest, Playwright E2E) eliminating 100% of type errors to reach Six Sigma 5.9 quality
- Designed a Bayesian Knowledge Tracing engine with VARK+ 8-dimensional learning-style profiling and 39+ cognitive training games — delivering personalized ADHD-optimized instruction across subject-isolated AI classrooms

**LaChowOS** — *Next.js 16, NestJS 11, Prisma, PostgreSQL, Stripe, Turborepo, AWS S3, Redis*

Unified property management SaaS for La Chow's mixed-use culinary innovation facilities — kitchen scheduling, lease management, rent collection, and compliance across 7 commercial kitchens with a 121-unit expansion in progress.

- Architected a **Turborepo monorepo** (pnpm workspaces) shipping a NestJS 11 API with **52 feature modules**, a Next.js 16 / React 19 frontend with **62 admin + 34 tenant-portal pages**, and a shared Prisma package with **84 models** generating type-safe clients across both apps
- Designed PostgreSQL schema with **tsrange exclusion constraints + GiST indexes** preventing double-booking of shared kitchen spaces at the database level, eliminating application-layer race conditions
- Integrated **9+ third-party services**: Stripe (rent + webhooks), DocuSign (eSignature lease workflows), SendGrid, AWS S3 (presigned-URL uploads + PDF parsing), QuickBooks, Supabase, Redis/ioredis caching, Sentry, and DoorLoop (idempotent legacy import via `externalId` deduplication)
- Implemented JWT authentication (Passport) with **TOTP 2FA + QR enrollment**, role-based access control, customizable tenant setup-link expiry (1–90 days), and proactive session-expiry warnings
- Engineered **Socket.IO real-time notifications**, cron-scheduled jobs (lease expiration alerts, compliance reminders), and a per-property late-fee policy engine with bulk-apply UI and read-time fee resolution

**La Chow Public Site & Admin CMS** — *Next.js 16, React 19, Tailwind, Stripe, Supabase, Google Analytics Data API*

Public-facing marketing site (commercial kitchen, event/office spaces, blog, magazine, package builder, tour booking) paired with a custom admin CMS for content management and analytics.

- Built a **17-page Next.js marketing site** with full SEO setup (`sitemap.ts`, `robots.ts`), markdown-driven blog/magazine content via remark, and Vercel Analytics — covering commercial kitchen, event/office spaces, package builder, and tour booking
- Integrated **Stripe** for online ordering and tour-booking checkout, with serverless API routes handling checkout sessions, webhook verification, and order persistence in Supabase
- Built a separate Next.js admin panel with **bcrypt-based authentication**, a markdown content editor, and a real-time analytics dashboard pulling live traffic data via the **Google Analytics Data API**

---

## PROJECTS

### BSDOC — Personal Health Management Platform &nbsp;&nbsp;|&nbsp;&nbsp; https://bsdoc-project.vercel.app

*Next.js, Node.js, Supabase, TypeScript*

Health management platform with multi-role auth, admin panel, and doctor verification workflows.

- Built 8+ REST API routes (appointments, doctors, availability, notifications, admin analytics) with JWT authentication and Supabase Admin client, handling ~300 req/min throughput
- Engineered AI-powered fuzzy symptom search with 3-tier resolution pipeline (direct lookup → synonym match → corpus match) using string-similarity, **reducing unresolved inputs by 78%**
- Implemented role-based access control middleware with Supabase SSR supporting 3 user tiers (patient/doctor/admin), achieving 100% route protection with single-DB-call role verification
- Developed admin analytics dashboard with 5 concurrent Chart.js visualizations (bar, line, weight charts) and parallel API fetching, **reducing dashboard load time by 60%**
- Architected end-to-end appointment booking pipeline with atomic slot conflict detection (**65% faster** via `.limit(1)` optimization) and transactional push notifications (~120ms delivery)
- Integrated Supabase Realtime for live push notifications, eliminating polling and **reducing bandwidth usage by 95%**

### AI.pollo — AI Mood-Based Music Recommender &nbsp;&nbsp;|&nbsp;&nbsp; https://ai-pollo.vercel.app

*React, TypeScript, Vite, FastAPI, PostgreSQL, Spotify API, Vercel*

AI-powered mood-based playlist recommender using a custom Curated Intersect Algorithm that scrapes and scores 2,000+ tracks from curated Spotify playlists against listening history and ML feedback, achieving **44% faster recommendations** than deprecated endpoints.

- Engineered a 5-tier weighted scoring pipeline processing 2,000+ candidate tracks with `asyncio.gather` concurrency, **reducing recommendation latency by 44%**
- Built real-time multiplayer Spotify Blend rooms with 5-letter shortcode matchmaking and group consensus scoring, **cutting collaborative generation time by 67%**
- Implemented persistent ML feedback loop (thumbs up/down) biasing artist-weighting by +200 points, **improving personalization hit-rate by 200%**
- Designed dual-layer content filter (16-token blocklist + popularity gating) **eliminating 95% of junk tracks** from scraped playlist results
- Deployed serverless FastAPI backend on Vercel with stateless OAuth 2.0, automated Alembic migrations on cold boot, and async background data retention scheduler

### SchemaFlow — Interactive Schema Visualizer &nbsp;&nbsp;|&nbsp;&nbsp; https://schemaflow-pi.vercel.app

*React 19, TypeScript, Vite, React Flow, Dagre, Zustand, Zod, CodeMirror 6, TailwindCSS*

Interactive schema visualization tool that parses SQL DDL and JSON payloads into live ERD diagrams with field-level edge connections, auto-layout, and relationship labels.

- Engineered a real-time SQL DDL and JSON schema parser processing 50-table schemas in **< 2ms (~25K tables/sec)**, reducing manual ERD creation time by 95% using regex-based parsing and recursive descent
- Architected a zero-latency React Flow transformation pipeline achieving **185K transforms/sec** with Dagre auto-layout, field-level edge routing, and Zod runtime validation at 100% accuracy across 5,000 iterations
- Built a multi-format export engine generating Mermaid ERD, Markdown docs, TypeScript interfaces, and mock REST API specs in **0.025ms per export (~40K exports/sec)**, enabling one-click schema documentation for Agile workflows
- Developed an interactive schema visualization tool with CodeMirror 6 editor, localStorage persistence, dark/light theming, and keyboard shortcuts, delivering **sub-5ms end-to-end render times** for complex schemas with 300+ fields

---

## CERTIFICATIONS

**SEO Certification — HubSpot Academy** &nbsp;&nbsp;|&nbsp;&nbsp; Valid: Dec 2025 – Jan 2027

Demonstrated knowledge in SEO fundamentals, keyword research, ranking factors, and optimization strategies.

---

## AWARDS

**2nd Prize — Huawei ICT Competition (Network Track), Philippines (2025–2026)**

---

## EDUCATION

**Bachelor of Science in Computer Engineering** &nbsp;&nbsp;|&nbsp;&nbsp; August 2022 – May 2026
Cebu Institute of Technology - University *(Consistent Dean's Lister & Full Scholar)*

**Science, Technology, Engineering, and Mathematics Strand (Secondary)** &nbsp;&nbsp;|&nbsp;&nbsp; June 2016 – July 2022
