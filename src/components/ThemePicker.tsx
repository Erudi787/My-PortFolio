'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

interface ThemeOption {
  name: string;
  label: string;
  /** The dot's fill — should be the canonical accent for that theme. */
  dotColor: string;
  /** The ring/background dot color for mono so it doesn't disappear on white. */
  ringColor?: string;
}

const THEMES: ThemeOption[] = [
  { name: 'iris',    label: 'Iris',    dotColor: 'oklch(0.72 0.22 295)' },
  { name: 'emerald', label: 'Emerald', dotColor: 'oklch(0.68 0.18 160)' },
  { name: 'copper',  label: 'Copper',  dotColor: 'oklch(0.58 0.16 45)'  },
  { name: 'voltage', label: 'Voltage', dotColor: 'oklch(0.92 0.21 100)' },
  { name: 'mono',    label: 'Mono',    dotColor: 'oklch(0.12 0 0)', ringColor: 'oklch(0.99 0 0)' },
];

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Reserve enough width to avoid layout shift on hydration
    return <div aria-hidden="true" className="h-4 w-[7.5rem]" />;
  }

  return (
    <div role="radiogroup" aria-label="Theme" className="flex items-center gap-2">
      {THEMES.map((t) => {
        const active = theme === t.name;
        return (
          <button
            key={t.name}
            role="radio"
            aria-checked={active}
            aria-label={`${t.label} theme`}
            title={t.label}
            onClick={() => setTheme(t.name)}
            className={`relative h-3 w-3 rounded-full outline-none transition-transform duration-200 ${
              active ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'
            } focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-fg`}
            style={{
              background: t.dotColor,
              boxShadow: active
                ? `0 0 0 1.5px var(--bg), 0 0 0 3px ${t.dotColor}`
                : t.ringColor
                  ? `inset 0 0 0 1px ${t.ringColor}`
                  : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
