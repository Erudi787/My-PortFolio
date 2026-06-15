'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Tiny cursor-driven dot-eating easter egg, inspired by Seeson's
 * "Move your cursor · Eat 24 dots". Opt-in: small floating widget
 * in the bottom-left corner that scatters 24 dots across the
 * viewport when clicked. Cursor "eats" them on proximity (≤ EAT_RADIUS).
 * Hidden on touch devices (no cursor to eat with).
 */

const DOT_COUNT = 24;
const EAT_RADIUS = 28; // px — within this distance the dot is "eaten"

interface Dot {
  id: number;
  x: number; // percent of viewport width
  y: number; // percent of viewport height
  eaten: boolean;
}

function makeDots(): Dot[] {
  return Array.from({ length: DOT_COUNT }, (_, i) => ({
    id: i,
    // Keep a small safe margin from edges so dots don't land under nav/footer
    x: Math.random() * 90 + 5,
    y: Math.random() * 80 + 10,
    eaten: false,
  }));
}

export default function PacmanEgg() {
  const [active, setActive] = useState(false);
  const [dots, setDots] = useState<Dot[]>([]);
  const [hasPointer, setHasPointer] = useState(true);
  const cursorRef = useRef({ x: 0, y: 0 });

  // Detect touch / no-cursor devices and hide entirely
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setHasPointer(finePointer);
  }, []);

  // Track cursor; throttle eating to once per animation frame
  useEffect(() => {
    if (!active) return;

    const onMove = (e: PointerEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    window.addEventListener('pointermove', onMove);

    let raf = 0;
    const tick = () => {
      setDots((prev) => {
        let mutated = false;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const next = prev.map((d) => {
          if (d.eaten) return d;
          const dx = (d.x / 100) * vw - cursorRef.current.x;
          const dy = (d.y / 100) * vh - cursorRef.current.y;
          if (dx * dx + dy * dy <= EAT_RADIUS * EAT_RADIUS) {
            mutated = true;
            return { ...d, eaten: true };
          }
          return d;
        });
        return mutated ? next : prev;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!hasPointer) return null;

  const eaten = dots.filter((d) => d.eaten).length;
  const remaining = DOT_COUNT - eaten;
  const allEaten = active && remaining === 0;

  const handleClick = () => {
    if (allEaten) {
      // Reset for another round
      setDots(makeDots());
      return;
    }
    if (!active) {
      setActive(true);
      setDots(makeDots());
    }
  };

  return (
    <>
      {/* Dot field — fixed to viewport */}
      {active && dots.map((d) => (
        <span
          key={d.id}
          aria-hidden="true"
          className={`pointer-events-none fixed h-2 w-2 rounded-full bg-primary transition-opacity duration-200 z-30 ${
            d.eaten ? 'opacity-0 scale-150' : 'opacity-70'
          }`}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px 1px hsl(var(--primary) / 0.35)',
          }}
        />
      ))}

      {/* Floating launcher / counter */}
      <button
        onClick={handleClick}
        className="fixed bottom-4 left-4 z-40 px-3 py-2 rounded-full border border-border bg-background/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
      >
        {!active && <>Move your cursor · Eat {DOT_COUNT} dots</>}
        {active && !allEaten && (
          <>
            <span className="text-primary">●</span> {remaining} / {DOT_COUNT} left
          </>
        )}
        {allEaten && <span className="text-primary">Got them all · play again?</span>}
      </button>
    </>
  );
}
