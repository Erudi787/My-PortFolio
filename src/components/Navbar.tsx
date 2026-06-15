'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemePicker from './ThemePicker';

const navItems = [
  { name: 'Home',       href: '#hero' },
  { name: 'About',      href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/70 backdrop-blur-lg border-b border-border'
          : 'py-4 bg-background/10 backdrop-blur-lg'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-xl font-bold flex items-center">
          <span className="relative text-2xl md:text-3xl z-10">
            <span className="text-glow text-foreground">elwison&apos;s</span>
            <span className="text-primary"> portfolio</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 text-sm md:text-base"
            >
              {item.name}
            </a>
          ))}
          <ThemePicker />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemePicker />
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="p-2 text-foreground z-50"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="flex flex-col items-center gap-5 py-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 text-lg"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
