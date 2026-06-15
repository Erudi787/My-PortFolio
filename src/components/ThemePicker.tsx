'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

type Mode = 'dark' | 'light';

interface ColorOption {
  name: string;
  label: string;
  /** Accent shown in the picker dot — uses the dark-mode primary so dots read consistently */
  dotColor: string;
  /** Ring color for mono so the black dot doesn't disappear on white */
  ringColor?: string;
}

const COLORS: ColorOption[] = [
  { name: 'iris',    label: 'Iris',    dotColor: 'hsl(250 70% 65%)' },
  { name: 'emerald', label: 'Emerald', dotColor: 'hsl(160 55% 55%)' },
  { name: 'copper',  label: 'Copper',  dotColor: 'hsl(35 70% 60%)' },
  { name: 'voltage', label: 'Voltage', dotColor: 'hsl(55 95% 60%)' },
  { name: 'mono',    label: 'Mono',    dotColor: 'hsl(0 0% 15%)', ringColor: 'hsl(0 0% 95%)' },
];

const DEFAULT = { color: 'iris', mode: 'dark' as Mode };

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
    return <div aria-hidden="true" className="h-4 w-[10rem]" />;
  }

  const { color: activeColor, mode: activeMode } = parseTheme(theme);

  const setColor = (color: string) => setTheme(`${color}-${activeMode}`);
  const toggleMode = () => setTheme(`${activeColor}-${activeMode === 'dark' ? 'light' : 'dark'}`);

  return (
    <div className="flex items-center gap-3">
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
              } focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-foreground`}
              style={{
                background: c.dotColor,
                boxShadow: active
                  ? `0 0 0 1.5px hsl(var(--background)), 0 0 0 3px ${c.dotColor}`
                  : c.ringColor
                    ? `inset 0 0 0 1px ${c.ringColor}`
                    : undefined,
              }}
            />
          );
        })}
      </div>

      <span aria-hidden="true" className="h-3 w-px bg-border" />

      <button
        onClick={toggleMode}
        aria-label={`Switch to ${activeMode === 'dark' ? 'light' : 'dark'} mode`}
        className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
      >
        {activeMode === 'dark' ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}
