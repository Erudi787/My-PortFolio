'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  duration: number;
}

interface Meteor {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  angle: number; // deg — meteor's travel rotation (195°–240°)
}

/**
 * Star + meteor backdrop, only renders when the active theme is `meteors-*`.
 * Density: floor(viewport_area / 8000) stars + 6 meteors.
 */
export default function StarBackground() {
  const { resolvedTheme, theme } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const generateStars = () => {
      const numStars = Math.floor((window.innerHeight * window.innerWidth) / 8000);
      setStars(
        Array.from({ length: numStars }, (_, i) => ({
          id: i,
          size: Math.random() * 3 + 1,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 4 + 2,
        })),
      );
    };

    const generateMeteors = () => {
      // Bucket x across the full width so every horizontal band gets
      // a meteor — otherwise random clusters leave half the sky empty.
      const COUNT = 10;
      setMeteors(
        Array.from({ length: COUNT }, (_, i) => ({
          id: i,
          size: Math.random() * 2 + 1,
          // i/COUNT places the slot, jitter spreads it, -5..115 lets
          // the leftmost meteors enter from off-screen.
          x: (i / COUNT) * 110 + Math.random() * 10 - 5,
          // Wider y range so meteors with shallow angles appear to enter
          // from the left side mid-height, not only from the top sky.
          y: Math.random() * 60,
          // Small positive delays: each meteor sits invisible at its
          // off-screen entry frame (opacity 0) until its delay fires,
          // so meteors trickle in from above instead of popping mid-air.
          delay: Math.random() * 2.5,
          duration: Math.random() * 3 + 2,
          // 195°–240°: 195° ≈ near-horizontal left→right (enters from left
          // side), 240° ≈ steep down-right (enters from above). Mixed roll
          // gives a natural-looking shower from multiple directions.
          angle: 195 + Math.random() * 45,
        })),
      );
    };

    generateStars();
    generateMeteors();

    const onResize = () => generateStars();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const active = (resolvedTheme ?? theme ?? '').toLowerCase();
  const showMeteors = mounted && active.startsWith('meteors-');
  if (!showMeteors) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star animate-pulse-subtle"
          style={
            {
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: `${s.x}%`,
              top: `${s.y}%`,
              opacity: s.opacity,
              '--star-opacity': s.opacity,
              '--star-duration': `${s.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {meteors.map((m) => (
        <span
          key={`m-${m.id}`}
          className="meteor animate-meteor"
          style={
            {
              width: `${m.size * 50}px`,
              height: `${m.size}px`,
              left: `${m.x}%`,
              top: `${m.y}%`,
              '--meteor-duration': `${m.duration}s`,
              // Positive delay paired with an opacity-0 entry frame in
              // the @keyframes — meteor stays invisible off-screen until
              // its delay fires, then falls in naturally.
              '--meteor-delay': `${m.delay}s`,
              '--meteor-angle': `${m.angle}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
