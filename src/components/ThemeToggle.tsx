'use client';

import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div aria-hidden="true" className="w-9 h-9" />;
  }

  const current = theme === 'system' ? resolvedTheme : theme;
  const isDark = current === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="p-2 rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
