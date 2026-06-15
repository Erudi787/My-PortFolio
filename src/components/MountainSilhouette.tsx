'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Two-layer mountain silhouette band along the viewport's bottom edge.
 * Both layers fill with the active `--primary` at low alpha so the horizon
 * harmonises with whichever season is picked. Suppressed on `meteors-*`
 * themes (which already have their own starfield backdrop).
 */
export default function MountainSilhouette() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const active = (theme ?? '').toLowerCase();
  if (active.startsWith('meteors-')) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 bottom-0 pointer-events-none z-0"
      style={{ height: '28vh' }}
    >
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Back range — taller, lighter, more jagged */}
        <path
          d="M0,300 L0,170 L80,110 L170,160 L260,80 L350,140 L450,70 L560,130 L680,90 L790,150 L890,100 L1000,160 L1100,110 L1200,140 L1200,300 Z"
          fill="hsl(var(--primary) / 0.08)"
        />
        {/* Front range — shorter, denser, more rounded */}
        <path
          d="M0,300 L0,235 L100,205 L220,245 L340,200 L470,225 L600,190 L730,230 L860,205 L990,240 L1110,215 L1200,225 L1200,300 Z"
          fill="hsl(var(--primary) / 0.14)"
        />
        {/* Ground catch — solid base so the horizon doesn't show seams */}
        <rect x="0" y="280" width="1200" height="20" fill="hsl(var(--primary) / 0.18)" />
      </svg>
    </div>
  );
}
