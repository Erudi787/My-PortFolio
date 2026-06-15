'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

type Mode = 'morning' | 'night';
type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonOption {
  name: Season;
  label: string;
  /** Color shown in the picker dot (uses the season's night-mode primary so dots read consistently) */
  dotColor: string;
}

const SEASONS: SeasonOption[] = [
  { name: 'spring', label: 'Spring', dotColor: 'hsl(345 60% 68%)' },
  { name: 'summer', label: 'Summer', dotColor: 'hsl(40 75% 62%)'  },
  { name: 'autumn', label: 'Autumn', dotColor: 'hsl(20 70% 58%)'  },
  { name: 'winter', label: 'Winter', dotColor: 'hsl(205 55% 65%)' },
];

const DATE_KEY = 'theme-date';

/** Northern-hemisphere season from month. */
function getCurrentSeason(date = new Date()): Season {
  const m = date.getMonth(); // 0 = Jan
  if (m >= 2 && m <= 4) return 'spring';  // Mar–May
  if (m >= 5 && m <= 7) return 'summer';  // Jun–Aug
  if (m >= 8 && m <= 10) return 'autumn'; // Sep–Nov
  return 'winter';                         // Dec–Feb
}

/** Morning between 6am & 6pm, otherwise Night. */
function getCurrentMode(date = new Date()): Mode {
  const h = date.getHours();
  return h >= 6 && h < 18 ? 'morning' : 'night';
}

function getAutoTheme(): string {
  return `${getCurrentSeason()}-${getCurrentMode()}`;
}

function parseTheme(theme: string | undefined): { season: Season; mode: Mode } {
  const fallback = { season: 'spring' as Season, mode: 'night' as Mode };
  if (!theme) return fallback;
  const dash = theme.lastIndexOf('-');
  if (dash === -1) return fallback;
  const season = theme.slice(0, dash) as Season;
  const mode = theme.slice(dash + 1) as Mode;
  if (!SEASONS.some(s => s.name === season)) return fallback;
  if (mode !== 'morning' && mode !== 'night') return fallback;
  return { season, mode };
}

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    // Daily reset: if stored date is from a previous day (or empty),
    // override with the time-of-day-derived auto theme. User overrides
    // re-stamp the date so they persist within the current day.
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(DATE_KEY);

    if (storedDate !== today) {
      setTheme(getAutoTheme());
      localStorage.setItem(DATE_KEY, today);
    }
  }, [setTheme]);

  if (!mounted) {
    return <div aria-hidden="true" className="h-4 w-[11rem]" />;
  }

  const { season: activeSeason, mode: activeMode } = parseTheme(theme);

  const setSeason = (s: Season) => {
    setTheme(`${s}-${activeMode}`);
    localStorage.setItem(DATE_KEY, new Date().toDateString());
  };
  const toggleMode = () => {
    const next: Mode = activeMode === 'night' ? 'morning' : 'night';
    setTheme(`${activeSeason}-${next}`);
    localStorage.setItem(DATE_KEY, new Date().toDateString());
  };

  return (
    <div className="flex items-center gap-3">
      <div role="radiogroup" aria-label="Season theme" className="flex items-center gap-2">
        {SEASONS.map((s) => {
          const active = activeSeason === s.name;
          return (
            <button
              key={s.name}
              role="radio"
              aria-checked={active}
              aria-label={`${s.label} theme`}
              title={s.label}
              onClick={() => setSeason(s.name)}
              className={`relative h-3 w-3 rounded-full outline-none transition-transform duration-200 ${
                active ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'
              } focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-foreground`}
              style={{
                background: s.dotColor,
                boxShadow: active
                  ? `0 0 0 1.5px hsl(var(--background)), 0 0 0 3px ${s.dotColor}`
                  : undefined,
              }}
            />
          );
        })}
      </div>

      <span aria-hidden="true" className="h-3 w-px bg-border" />

      <button
        onClick={toggleMode}
        aria-label={`Switch to ${activeMode === 'night' ? 'morning' : 'night'} mode`}
        className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
      >
        {activeMode === 'night' ? 'Morning' : 'Night'}
      </button>
    </div>
  );
}
