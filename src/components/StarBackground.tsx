'use client';

import { useEffect, useState } from 'react';

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
}

/**
 * Faithful port of rei-naissance/portfolio's StarBackground.
 * Density: floor(viewport_area / 8000) stars + 6 meteors.
 * In light mode the .star/.meteor utilities flip to a dark fill (see globals.css).
 */
export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

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
      setMeteors(
        Array.from({ length: 6 }, (_, i) => ({
          id: i,
          size: Math.random() * 2 + 1,
          x: Math.random() * 100,
          y: Math.random() * 20,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2,
        })),
      );
    };

    generateStars();
    generateMeteors();

    const onResize = () => generateStars();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
              '--meteor-delay': `${m.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
