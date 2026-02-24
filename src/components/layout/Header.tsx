// src/app/components/layout/Header.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, CodeXml } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

// ============================================
// TYPES
// ============================================
interface NavLink {
  href: string;
  label: string;
  type: 'scroll' | 'page';
  targetId?: string;
}

// ============================================
// CONSTANTS
// ============================================
const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', type: 'scroll', targetId: 'home' },
  { href: '/#about', label: 'About', type: 'scroll', targetId: 'about' },
  { href: '/#skills', label: 'Skills', type: 'scroll', targetId: 'skills' },
  { href: '/#projects-preview', label: 'Projects', type: 'scroll', targetId: 'projects-preview' },
  { href: '/contact', label: 'Contact', type: 'page', targetId: '/contact' },
];

const HEADER_HEIGHT = 70;
const SCROLL_THRESHOLD = 20;

// ============================================
// CUSTOM HOOK: useScrollState
// ============================================
function useScrollState() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}

// ============================================
// CUSTOM HOOK: useActiveSection
// ============================================
function useActiveSection(pathname: string) {
  const [activeLink, setActiveLink] = useState<string>('/');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set initial active link based on pathname
  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash.substring(1);
      setActiveLink(hash ? `/#${hash}` : '/');
    } else {
      const pageLink = NAV_LINKS.find(link => link.type === 'page' && pathname.startsWith(link.href));
      setActiveLink(pageLink?.href || '');
    }
  }, [pathname]);

  // Setup intersection observer for homepage sections
  useEffect(() => {
    // Cleanup previous observer
    observerRef.current?.disconnect();

    if (pathname !== '/') return;

    const topMargin = -(HEADER_HEIGHT + 20);
    const bottomMargin = -(window.innerHeight - HEADER_HEIGHT - 170);

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          const targetId = intersecting[0].target.id;
          const newHref = targetId === 'home' ? '/' : `/#${targetId}`;
          setActiveLink(newHref);
        } else if (window.scrollY < HEADER_HEIGHT + 50) {
          setActiveLink('/');
        }
      },
      {
        root: null,
        rootMargin: `${topMargin}px 0px ${bottomMargin}px 0px`,
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    // Observe all scroll sections
    NAV_LINKS.forEach(link => {
      if (link.type === 'scroll' && link.targetId) {
        const element = document.getElementById(link.targetId);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return { activeLink, setActiveLink };
}

// ============================================
// COMPONENT
// ============================================
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);

  const scrolled = useScrollState();
  const { activeLink, setActiveLink } = useActiveSection(pathname);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handleScrollTo = useCallback((targetId: string, targetHref: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    closeMobileMenu();

    // Home link - scroll to top or navigate to home
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

    // Hash links
    if (targetHref.startsWith('/#')) {
      setActiveLink(targetHref);

      if (pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = headerRef.current?.offsetHeight || HEADER_HEIGHT;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - headerOffset - 20, behavior: 'smooth' });
          history.pushState?.(null, '', `#${targetId}`);
        }
      } else {
        router.push(targetHref);
      }
    }
  }, [pathname, router, setActiveLink, closeMobileMenu]);

  const isLinkActive = useCallback((link: NavLink): boolean => {
    if (link.type === 'page') return pathname === link.href;
    if (link.targetId === 'home') return activeLink === '/' || activeLink === '/#home';
    return activeLink === link.href;
  }, [pathname, activeLink]);

  const renderNavLink = useCallback((link: NavLink, isMobile: boolean) => {
    const isActive = isLinkActive(link);

    const baseStyles = isMobile
      ? 'w-full text-center py-3 rounded-xl transition-all duration-300'
      : 'pb-1 border-b-2 transition-all duration-300 relative group font-medium text-sm md:text-base tracking-wide';

    const activeStyles = isMobile
      ? 'bg-gradient-to-r from-[#0A4DDE]/10 to-[#00C6C6]/10 text-[#0A4DDE] font-semibold shadow-sm'
      : 'border-transparent text-[#0A4DDE] font-semibold';

    const inactiveStyles = isMobile
      ? 'text-gray-600 hover:bg-gray-50'
      : 'border-transparent text-gray-400 hover:text-[#00C6C6]';

    const underlineStyles = !isMobile
      ? isActive
        ? "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[3px] after:bg-gradient-to-r after:from-[#00C6C6] after:to-[#0A4DDE] after:rounded-full"
        : "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[#00C6C6] after:to-[#0A4DDE] after:rounded-full after:transition-all after:duration-300 group-hover:after:w-full"
      : '';

    const className = `${baseStyles} ${isActive ? activeStyles : inactiveStyles} ${underlineStyles}`.trim();

    if (link.type === 'scroll') {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => handleScrollTo(link.targetId!, link.href, e)}
          className={`${className} cursor-pointer`}
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => {
          closeMobileMenu();
          setActiveLink(link.href);
        }}
        className={className}
      >
        {link.label}
      </Link>
    );
  }, [handleScrollTo, isLinkActive, closeMobileMenu, setActiveLink]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'py-3 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleScrollTo('home', '/', e)}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00C6C6] to-[#0A4DDE] hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2 group"
          aria-label="Go to homepage"
        >
          <div className="p-1.5 bg-[#0A4DDE]/10 rounded-lg group-hover:scale-110 transition-transform">
            <CodeXml size={28} className="text-[#0A4DDE]" aria-hidden="true" />
          </div>
          <span className="tracking-tight">Erudi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6" aria-label="Main navigation">
          {NAV_LINKS.map(link => renderNavLink(link, false))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="p-2 rounded-lg bg-[#0A4DDE]/10 hover:bg-[#0A4DDE]/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-[#0A4DDE]" aria-hidden="true" />
            ) : (
              <Menu size={24} className="text-[#0A4DDE]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md"
        >
          <nav className="flex flex-col items-center space-y-1 p-4" aria-label="Mobile navigation">
            {NAV_LINKS.map(link => renderNavLink(link, true))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
