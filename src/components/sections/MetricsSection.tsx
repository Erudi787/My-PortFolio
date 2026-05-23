// src/components/sections/MetricsSection.tsx — hybrid v3 (project-attributed metrics)
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface Metric {
  /** Project name shown as a bracketed kicker above the numeral — explicit attribution. */
  project: string;
  value: number;
  suffix?: string;
  /** What the number actually measures (shown under the numeral). */
  label: string;
}

// Ordered so LaChowOS leads — it matches the hero mockup directly above.
const METRICS: Metric[] = [
  { project: 'LaChowOS',         value: 45,   suffix: '+', label: 'NestJS modules' },
  { project: 'FutureThink Edge', value: 3000, suffix: '+', label: 'Concurrent users (engineered capacity)' },
  { project: 'Across projects',  value: 10,   suffix: '+', label: 'Third-party integrations wired' },
];

function formatNumber(n: number): string {
  return n >= 1000 ? n.toLocaleString('en-US') : String(n);
}

function CountUp({ to, suffix = '', durationMs = 1400 }: { to: number; suffix?: string; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, durationMs]);

  return (
    <span ref={ref}>
      {formatNumber(value)}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const reduce = useReducedMotion();
  const spring = { type: 'spring' as const, stiffness: 160, damping: 28, mass: 0.9 };
  const fade = (delay = 0) =>
    reduce
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, viewport: { once: true } }
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { ...spring, delay },
        };

  return (
    <section className="bg-bg text-fg pt-14 md:pt-20 pb-24 md:pb-32 relative overflow-hidden">
      {/* Subtle dot grid backdrop */}
      <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-30" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-x-12 max-w-6xl mx-auto">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.project}
              {...fade(0.06 + i * 0.08)}
              className="text-center md:text-left md:border-l md:border-border md:pl-10 md:first:border-l-0 md:first:pl-0 min-w-0"
            >
              {/* Project attribution — bracketed mono, accent-colored, sits above the numeral */}
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent mb-4 inline-flex items-baseline gap-1.5">
                <span aria-hidden="true">[</span>
                <span>{m.project}</span>
                <span aria-hidden="true">]</span>
              </p>

              <p className="font-metric text-outlined text-fg text-[clamp(3.5rem,8vw,6rem)] whitespace-nowrap">
                <CountUp to={m.value} suffix={m.suffix} />
              </p>

              <p className="mt-4 max-w-xs mx-auto md:mx-0 text-sm md:text-base text-fg-muted leading-snug">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
