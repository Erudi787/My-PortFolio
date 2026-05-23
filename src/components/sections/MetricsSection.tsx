// src/components/sections/MetricsSection.tsx — high-end v2
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface Metric {
  value: number;
  suffix?: string;
  label: string;
  /** Number of decimals when formatting */
  decimals?: number;
}

const METRICS: Metric[] = [
  { value: 3000, suffix: '+', label: 'Concurrent-user capacity on FutureThink Edge' },
  { value: 45,   suffix: '+', label: 'NestJS modules in LaChowOS' },
  { value: 10,   suffix: '+', label: 'Third-party integrations wired' },
];

function formatNumber(n: number, decimals = 0): string {
  if (n >= 1000) {
    return n.toLocaleString('en-US', { maximumFractionDigits: decimals });
  }
  return n.toFixed(decimals);
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
      // Ease-out cubic
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
    <section className="bg-bg text-fg py-28 md:py-36 relative overflow-hidden">
      {/* Subtle dot grid backdrop */}
      <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-30" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <motion.p
          {...fade(0)}
          className="text-[12px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-12 md:mb-16 text-center"
        >
          Last twelve months — at a glance
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              {...fade(0.06 + i * 0.08)}
              className="text-center md:text-left md:border-l md:border-border md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <p className="font-metric text-fg text-[6rem] sm:text-[8rem] md:text-[7.5rem] lg:text-[9rem]">
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
