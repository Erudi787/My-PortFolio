'use client';

import { useEffect, useState } from 'react';

/**
 * Faithful port of rei-naissance/portfolio's Preloader with cinematic
 * minimum-duration + image preloading. Skips on repeat visits in the
 * same tab via sessionStorage so it doesn't feel slow on subsequent loads.
 */
const MIN_DURATION_MS = 1250;
const MAX_WAIT_MS = 5000;
const SESSION_FLAG = 'preloader-seen';

const IMAGES_TO_PRELOAD: string[] = [
  '/images/profile.jpg',
  '/images/lachow-thumbnail.png',
  '/images/futurethink-thumbnail.png',
  '/images/bsdoc-thumbnail.jpg',
  '/images/schemaflow_thumbnail.png',
  '/images/bookbuddi-thumbnail.png',
  '/images/sync_landing.png',
  '/images/apollo_login.jpg',
  '/images/wildchat_login.png',
];

export default function Preloader({ onLoaded }: { onLoaded?: () => void } = {}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'mounting' | 'visible' | 'fading' | 'gone'>('mounting');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip on repeat visit / reduced motion
    if (sessionStorage.getItem(SESSION_FLAG) === '1') {
      setPhase('gone');
      onLoaded?.();
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone');
      onLoaded?.();
      return;
    }

    setPhase('visible');

    let loadedCount = 0;
    const total = IMAGES_TO_PRELOAD.length;
    let currentProgress = 0;
    const startTime = performance.now();

    // Kick off image preloads
    IMAGES_TO_PRELOAD.forEach((src) => {
      const img = new Image();
      img.onload = () => { loadedCount += 1; };
      img.onerror = () => { loadedCount += 1; };
      img.src = src;
    });

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      // Time-based progress (cinematic floor)
      const timeProgress = Math.min(100, (elapsed / MIN_DURATION_MS) * 100);
      const realProgress = total === 0 ? 100 : Math.round((loadedCount / total) * 100);
      let targetProgress = Math.min(realProgress, timeProgress);
      if (elapsed > MAX_WAIT_MS) targetProgress = 100;

      // Smooth interpolation (easing toward target)
      currentProgress += (targetProgress - currentProgress) * 0.15;
      if (currentProgress > 99.5) currentProgress = 100;
      setProgress(Math.round(currentProgress));

      if (currentProgress >= 100) {
        sessionStorage.setItem(SESSION_FLAG, '1');
        setPhase('fading');
        setTimeout(() => {
          setPhase('gone');
          onLoaded?.();
        }, 400);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onLoaded]);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden={phase !== 'visible'}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-400 ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="text-2xl md:text-3xl font-bold text-glow tracking-tight">
          <span className="text-foreground">Elwison</span>
          <span className="text-primary"> Denampo</span>
        </span>

        <div className="flex items-center gap-3 w-64 max-w-[60vw]">
          <div className="flex-1 h-px bg-border overflow-hidden">
            <span
              className="block h-full bg-primary transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground tabular-nums"
            style={{ minWidth: '2.5ch', textAlign: 'right' }}
          >
            {progress}
          </span>
        </div>
      </div>
    </div>
  );
}
