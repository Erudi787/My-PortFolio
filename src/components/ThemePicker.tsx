'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

type Mode = 'dark' | 'light';

interface ColorOption {
  name: string;
  label: string;
  /** Accent color shown in the picker dot — uses the dark-mode accent so dots read consistently. */
  dotColor: string;
  /** Extra inset ring for mono (otherwise the black dot disappears on light backgrounds). */
  ringColor?: string;
}

const COLORS: ColorOption[] = [
  { name: 'iris',    label: 'Iris',    dotColor: 'oklch(0.74 0.22 295)' },
  { name: 'emerald', label: 'Emerald', dotColor: 'oklch(0.70 0.18 160)' },
  { name: 'copper',  label: 'Copper',  dotColor: 'oklch(0.68 0.18 50)'  },
  { name: 'voltage', label: 'Voltage', dotColor: 'oklch(0.92 0.21 100)' },
  { name: 'mono',    label: 'Mono',    dotColor: 'oklch(0.12 0 0)', ringColor: 'oklch(0.99 0 0)' },
];

const DEFAULT: { color: string; mode: Mode } = { color: 'iris', mode: 'dark' };

/** Parse "iris-dark" → { color: 'iris', mode: 'dark' }. Falls back to default if malformed. */
function parseTheme(theme: string | undefined): { color: string; mode: Mode } {
  if (!theme) return DEFAULT;
  const lastDash = theme.lastIndexOf('-');
  if (lastDash === -1) return DEFAULT;
  const color = theme.slice(0, lastDash);
  const mode = theme.slice(lastDash + 1) as Mode;
  if (mode !== 'dark' && mode !== 'light') return DEFAULT;
  if (!COLORS.some(c => c.name === color)) return DEFAULT;
  return { color, mode };
}

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Reserve approximate width so the header doesn't shift on hydration
    return <div aria-hidden="true" className="h-4 w-[10rem]" />;
  }

  const { color: activeColor, mode: activeMode } = parseTheme(theme);

  const setColor = (color: string) => setTheme(`${color}-${activeMode}`);
  const toggleMode = () => setTheme(`${activeColor}-${activeMode === 'dark' ? 'light' : 'dark'}`);

  return (
    <div className="flex items-center gap-3">
      {/* Color picker — 5 dots */}
      <div role="radiogroup" aria-label="Theme color" className="flex items-center gap-2">
        {COLORS.map((c) => {
          const active = activeColor === c.name;
          return (
            <button
              key={c.name}
              role="radio"
              aria-checked={active}
              aria-label={`${c.label} theme`}
              title={c.label}
              onClick={() => setColor(c.name)}
              className={`relative h-3 w-3 rounded-full outline-none transition-transform duration-200 ${
                active ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'
              } focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-fg`}
              style={{
                background: c.dotColor,
                boxShadow: active
                  ? `0 0 0 1.5px var(--bg), 0 0 0 3px ${c.dotColor}`
                  : c.ringColor
                    ? `inset 0 0 0 1px ${c.ringColor}`
                    : undefined,
              }}
            />
          );
        })}
      </div>

      {/* Divider */}
      <span aria-hidden="true" className="h-3 w-px bg-border-strong" />

      {/* Mode toggle */}
      <button
        onClick={toggleMode}
        aria-label={`Switch to ${activeMode === 'dark' ? 'light' : 'dark'} mode`}
        className="text-[11px] font-mono uppercase tracking-[0.22em] text-fg-muted hover:text-fg transition-colors"
      >
        {activeMode === 'dark' ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}
