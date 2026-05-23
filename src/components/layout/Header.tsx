// src/components/layout/Header.tsx — high-end v2 (glass nav, Linear/Vercel pattern)
'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ThemePicker from '../ThemePicker';

interface NavLink {
  href: string;
  label: string;
  type: 'scroll' | 'page';
  targetId?: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/#about', label: 'About', type: 'scroll', targetId: 'about' },
  { href: '/#skills', label: 'Stack', type: 'scroll', targetId: 'skills' },
  { href: '/#projects-preview', label: 'Work', type: 'scroll', targetId: 'projects-preview' },
  { href: '/contact', label: 'Contact', type: 'page', targetId: '/contact' },
];

const HEADER_HEIGHT = 72;

function useActiveSection(pathname: string) {
  const [activeLink, setActiveLink] = useState<string>('/');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash.substring(1);
      setActiveLink(hash ? `/#${hash}` : '/');
    } else {
      const pageLink = NAV_LINKS.find(l => l.type === 'page' && pathname.startsWith(l.href));
      setActiveLink(pageLink?.href || pathname);
    }
  }, [pathname]);

  useEffect(() => {
    observerRef.current?.disconnect();
    if (pathname !== '/') return;

    const topMargin = -(HEADER_HEIGHT + 20);
    const bottomMargin = -(window.innerHeight - HEADER_HEIGHT - 170);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveLink(id === 'home' ? '/' : `/#${id}`);
        } else if (window.scrollY < HEADER_HEIGHT + 50) {
          setActiveLink('/');
        }
      },
      { root: null, rootMargin: `${topMargin}px 0px ${bottomMargin}px 0px`, threshold: 0.1 },
    );

    observerRef.current = observer;
    NAV_LINKS.forEach(link => {
      if (link.type === 'scroll' && link.targetId) {
        const el = document.getElementById(link.targetId);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return { activeLink, setActiveLink };
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);

  const { activeLink, setActiveLink } = useActiveSection(pathname);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handleScrollTo = useCallback((targetId: string, targetHref: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    closeMobileMenu();

    if (targetHref === '/' && targetId === 'home') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveLink('/');
        history.pushState?.(null, '', '/');
      } else {
        router.push('/');
      }
      return;
    }

    if (targetHref.startsWith('/#')) {
      setActiveLink(targetHref);
      if (pathname === '/') {
        const el = document.getElementById(targetId);
        if (el) {
          const offset = headerRef.current?.offsetHeight || HEADER_HEIGHT;
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: top - offset - 16, behavior: 'smooth' });
          history.pushState?.(null, '', `#${targetId}`);
        }
      } else {
        router.push(targetHref);
      }
    }
  }, [pathname, router, setActiveLink, closeMobileMenu]);

  const isLinkActive = useCallback((link: NavLink): boolean => {
    if (link.type === 'page') return pathname === link.href;
    return activeLink === link.href;
  }, [pathname, activeLink]);

  const renderNavLink = (link: NavLink, isMobile: boolean) => {
    const active = isLinkActive(link);
    const className = isMobile
      ? `block w-full py-3 px-6 text-base transition-colors ${active ? 'text-fg' : 'text-fg-muted hover:text-fg'}`
      : `relative text-[14px] font-medium transition-colors ${active ? 'text-fg' : 'text-fg-muted hover:text-fg'}`;

    const inner = (
      <>
        {link.label}
        {!isMobile && active && (
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[5px] w-[5px] rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
          />
        )}
      </>
    );

    if (link.type === 'scroll') {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => handleScrollTo(link.targetId!, link.href, e)}
          className={className}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => { closeMobileMenu(); setActiveLink(link.href); }}
        className={className}
      >
        {inner}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
        {/* Wordmark — sans, mid-weight, monogram dot */}
        <Link
          href="/"
          onClick={(e) => handleScrollTo('home', '/', e)}
          className="group flex items-center gap-2 text-fg hover:text-accent transition-colors"
          aria-label="Go to homepage"
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent group-hover:shadow-[0_0_12px_var(--accent)] transition-shadow"
          />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            Elwison Denampo
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          <nav className="flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(link => renderNavLink(link, false))}
          </nav>
          <div className="pl-6 border-l border-border">
            <ThemePicker />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4">
          <ThemePicker />
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="text-[14px] font-medium text-fg-muted hover:text-fg transition-colors px-2 py-1"
          >
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 glass border-t border-border"
        >
          <nav className="flex flex-col py-2" aria-label="Mobile navigation">
            {NAV_LINKS.map(link => renderNavLink(link, true))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
