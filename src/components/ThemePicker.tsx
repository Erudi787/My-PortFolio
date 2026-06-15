'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { ChevronDown, Check } from 'lucide-react';

type Mode = 'morning' | 'night';
type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'meteors';

interface SeasonOption {
  name: Season;
  label: string;
  dotColor: string;
}

const SEASONS: SeasonOption[] = [
  { name: 'spring',  label: 'Spring',  dotColor: 'hsl(345 60% 68%)' },
  { name: 'summer',  label: 'Summer',  dotColor: 'hsl(40 75% 62%)'  },
  { name: 'autumn',  label: 'Autumn',  dotColor: 'hsl(20 70% 58%)'  },
  { name: 'winter',  label: 'Winter',  dotColor: 'hsl(205 55% 65%)' },
  { name: 'meteors', label: 'Meteors', dotColor: 'hsl(260 70% 70%)' },
];

const DATE_KEY = 'theme-date';

function getCurrentSeason(date = new Date()): Season {
  const m = date.getMonth();
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  if (m >= 8 && m <= 10) return 'autumn';
  return 'winter';
}

function getCurrentMode(date = new Date()): Mode {
  const h = date.getHours();
  return h >= 6 && h < 18 ? 'morning' : 'night';
}

function getAutoTheme(): string {
  return `${getCurrentSeason()}-${getCurrentMode()}`;
}

const fallback = { season: 'spring' as Season, mode: 'night' as Mode };

function parseTheme(theme: string | undefined) {
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
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    const today = new Date().toDateString();
    const stored = localStorage.getItem(DATE_KEY);
    if (stored !== today) {
      setTheme(getAutoTheme());
      localStorage.setItem(DATE_KEY, today);
    }
  }, [setTheme]);

  // Click-outside + Escape to close
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!mounted) {
    return <div aria-hidden="true" className="h-8 w-[10rem]" />;
  }

  const { season: activeSeason, mode: activeMode } = parseTheme(theme);
  const activeSeasonOption = SEASONS.find(s => s.name === activeSeason)!;

  const setCombo = (s: Season, m: Mode) => {
    setTheme(`${s}-${m}`);
    localStorage.setItem(DATE_KEY, new Date().toDateString());
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/60 backdrop-blur-md text-[12px] font-medium text-foreground hover:border-primary/60 transition-colors"
      >
        <span
          aria-hidden="true"
          className="block h-2.5 w-2.5 rounded-full"
          style={{ background: activeSeasonOption.dotColor }}
        />
        <span className="capitalize">{activeSeason}</span>
        <span className="text-muted-foreground">·</span>
        <span className="capitalize text-muted-foreground">{activeMode}</span>
        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Theme picker"
          className="absolute right-0 mt-2 z-50 min-w-[14rem] rounded-xl border border-border bg-background/95 backdrop-blur-lg shadow-xl p-3"
        >
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_4rem_4rem] items-center gap-1 mb-2 px-2 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
            <span>Season</span>
            <span className="text-center">Morning</span>
            <span className="text-center">Night</span>
          </div>

          {/* Rows: 4 seasons × 2 modes */}
          <div className="space-y-1">
            {SEASONS.map((s) => (
              <div key={s.name} className="grid grid-cols-[1fr_4rem_4rem] items-center gap-1">
                <span className="inline-flex items-center gap-2 px-2 text-[13px] text-foreground">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: s.dotColor }}
                  />
                  {s.label}
                </span>

                {(['morning', 'night'] as Mode[]).map((m) => {
                  const active = activeSeason === s.name && activeMode === m;
                  return (
                    <button
                      key={m}
                      role="menuitemradio"
                      aria-checked={active}
                      aria-label={`${s.label} ${m}`}
                      onClick={() => setCombo(s.name, m)}
                      className={`flex items-center justify-center h-8 rounded-md transition-colors ${
                        active
                          ? 'bg-primary/15 text-primary'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {active ? (
                        <Check size={14} />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <p className="mt-3 pt-3 border-t border-border px-2 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
            Resets daily · follows time of day
          </p>
        </div>
      )}
    </div>
  );
}
