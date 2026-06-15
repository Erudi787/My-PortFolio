'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Seasonal particle field rendered ABOVE the mountain silhouette but
 * BELOW all foreground content. Each season uses an inline SVG so the
 * shape reads as the real thing (5-petal cherry blossom, maple leaf,
 * 6-arm snowflake, glowing firefly).
 *
 *   spring  — cherry blossoms drifting down and tumbling
 *   summer  — fireflies wandering in 2D with a slow blink (3 wander variants
 *             distributed across particles so no two trace the same path)
 *   autumn  — maple leaves falling + spinning
 *   winter  — snowflakes drifting straight down with light lateral drift
 *
 * All shapes tint with the active --primary (winter uses --foreground for the
 * cool monochrome snow look). Disabled under prefers-reduced-motion.
 * Suppressed on `meteors-*` themes (the starfield owns the bg there).
 */

type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'meteors';
type WanderVariant = 1 | 2 | 3;
type ShapeVariant = 0 | 1 | 2;

interface Particle {
  id: number;
  x: number;          // % horizontal start
  y: number;          // % vertical start (fireflies only)
  delay: number;      // s
  duration: number;   // s
  size: number;       // px
  drift: number;      // px lateral drift (falling shapes)
  rotate: number;     // deg starting rotation
  wanderVariant: WanderVariant; // for fireflies
  shapeVariant: ShapeVariant;   // for autumn leaves (and spring blossom hue)
}

const PARTICLE_COUNT = 22;

// Autumn palette: bright orange, golden yellow, deep rust — picked per leaf
const AUTUMN_TINTS = [
  'hsl(20 80% 58% / 0.9)',
  'hsl(38 80% 55% / 0.9)',
  'hsl(10 65% 45% / 0.92)',
];

function detectSeason(theme: string | undefined): Season {
  if (!theme) return 'spring';
  const s = theme.split('-')[0];
  if (
    s === 'spring' || s === 'summer' || s === 'autumn' ||
    s === 'winter' || s === 'meteors'
  ) return s;
  return 'spring';
}

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 12,
    duration: Math.random() * 14 + 10,
    // 14–28 base × the 1.6 multiplier downstream → roughly 22–45px on screen,
    // matching the seasonal references.
    size: Math.random() * 14 + 14,
    drift: (Math.random() - 0.5) * 80,
    rotate: Math.random() * 360,
    wanderVariant: ((i % 3) + 1) as WanderVariant,
    shapeVariant: ((i + Math.floor(Math.random() * 3)) % 3) as ShapeVariant,
  }));
}

// Cherry-blossom — 5 petals at 72° increments + tiny pollen center
function CherryBlossom() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="12" cy="6.5" rx="3.5" ry="5" transform={`rotate(${a} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="1.4" fill="hsl(var(--primary))" />
    </svg>
  );
}

// Maple leaf — classic flag-style silhouette
function MapleLeaf() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
      <path d="M12,2 L13,5.5 L16,3.5 L15,7 L18.5,6.5 L17,10 L20.5,11 L17,13 L19,17 L15,15.5 L16,19 L13,17.5 L12,21 L11,17.5 L8,19 L9,15.5 L5,17 L7,13 L3.5,11 L7,10 L5.5,6.5 L9,7 L8,3.5 L11,5.5 Z" />
    </svg>
  );
}

// Oak leaf — broad, deeply lobed silhouette
function OakLeaf() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
      <path d="M12,2 C13.5,3 14,4.5 13.8,6 C15,5.5 16.5,5.5 17.5,6.5 C18,8 17,9.5 15.8,10 C17.5,10.2 19,11.5 19,13 C19,14.5 17.5,15.5 16,15.3 C16.8,16.5 16.5,18 15,18.5 C13.8,18.9 12.8,18.2 12.5,17 L12.5,22 L11.5,22 L11.5,17 C11.2,18.2 10.2,18.9 9,18.5 C7.5,18 7.2,16.5 8,15.3 C6.5,15.5 5,14.5 5,13 C5,11.5 6.5,10.2 8.2,10 C7,9.5 6,8 6.5,6.5 C7.5,5.5 9,5.5 10.2,6 C10,4.5 10.5,3 12,2 Z" />
    </svg>
  );
}

// Elongated leaf — narrow with central spine
function ElongatedLeaf() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path
        d="M12,1.5 C16,5 18,9 18,14 C18,19 15,22 12,22.5 C9,22 6,19 6,14 C6,9 8,5 12,1.5 Z"
        fill="currentColor"
      />
      <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" />
    </svg>
  );
}

function pickLeaf(variant: ShapeVariant) {
  if (variant === 0) return <MapleLeaf />;
  if (variant === 1) return <OakLeaf />;
  return <ElongatedLeaf />;
}

// 6-armed snow crystal (3 crossing lines + center)
function Snowflake() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none">
      <line x1="12" y1="2"  x2="12" y2="22" />
      <line x1="3"  y1="7"  x2="21" y2="17" />
      <line x1="21" y1="7"  x2="3"  y2="17" />
      {/* tiny tip ornaments */}
      <g>
        <line x1="12" y1="5"  x2="10.5" y2="3.5" />
        <line x1="12" y1="5"  x2="13.5" y2="3.5" />
        <line x1="12" y1="19" x2="10.5" y2="20.5" />
        <line x1="12" y1="19" x2="13.5" y2="20.5" />
      </g>
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Firefly — solid bright core + soft halo (the halo also blinks via opacity)
function Firefly() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.18" />
      <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.45" />
      <circle cx="12" cy="12" r="2.3" fill="currentColor" />
    </svg>
  );
}

export default function SeasonalParticles() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!mounted || reducedMotion) return null;

  const season = detectSeason(theme);
  if (season === 'meteors') return null;

  return (
    <SeasonalSwarm key={season} season={season} />
  );
}

/**
 * Particles live behind a `key={season}` boundary, so changing the theme
 * remounts the swarm with a fresh roll. We use NEGATIVE animation-delay
 * so every particle enters at a random phase mid-loop instead of sitting
 * frozen at its starting position waiting for its delay to expire.
 */
function SeasonalSwarm({ season }: Readonly<{ season: Exclude<Season, 'meteors'> }>) {
  const particles = useMemo(() => makeParticles(), []);

  const renderParticle = (p: Particle) => {
    const sizeStyle: React.CSSProperties = {
      width: `${p.size * 1.6}px`,
      height: `${p.size * 1.6}px`,
      left: `${p.x}%`,
      // Negative delay = enter mid-animation (no frozen start frame on mount)
      animationDelay: `-${p.delay}s`,
      animationDuration: `${p.duration}s`,
    };

    if (season === 'spring') {
      return (
        <span
          key={p.id}
          aria-hidden="true"
          className="seasonal-particle particle-fall"
          style={{
            ...sizeStyle,
            color: 'hsl(var(--primary) / 0.7)',
            ['--drift' as string]: `${p.drift}px`,
            ['--rot' as string]: `${p.rotate}deg`,
          }}
        >
          <CherryBlossom />
        </span>
      );
    }

    if (season === 'autumn') {
      return (
        <span
          key={p.id}
          aria-hidden="true"
          className="seasonal-particle particle-fall"
          style={{
            ...sizeStyle,
            color: AUTUMN_TINTS[p.shapeVariant],
            ['--drift' as string]: `${p.drift}px`,
            ['--rot' as string]: `${p.rotate}deg`,
          }}
        >
          {pickLeaf(p.shapeVariant)}
        </span>
      );
    }

    if (season === 'winter') {
      return (
        <span
          key={p.id}
          aria-hidden="true"
          className="seasonal-particle particle-fall"
          style={{
            ...sizeStyle,
            color: 'hsl(var(--foreground) / 0.85)',
            ['--drift' as string]: `${p.drift * 0.3}px`,
            ['--rot' as string]: `${p.rotate}deg`,
          }}
        >
          <Snowflake />
        </span>
      );
    }

    // summer — firefly. Two nested spans: outer wanders, inner blinks.
    // Both layers use NEGATIVE delays so they enter mid-loop on mount.
    return (
      <span
        key={p.id}
        aria-hidden="true"
        className={`seasonal-particle firefly-wander-${p.wanderVariant}`}
        style={{
          ...sizeStyle,
          top: `${p.y}%`,
          color: 'hsl(var(--primary))',
          animationDelay: `-${p.delay}s`,
          animationDuration: `${p.duration + 4}s`,
        }}
      >
        <span
          className="firefly-blink"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            animationDelay: `-${p.delay * 0.6}s`,
            animationDuration: `${1.8 + (p.id % 5) * 0.4}s`,
          }}
        >
          <Firefly />
        </span>
      </span>
    );
  };

  return (
    <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map(renderParticle)}
    </div>
  );
}
