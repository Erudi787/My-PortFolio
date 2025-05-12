// src/app/components/layout/Header.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, CodeXml } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  type: 'scroll' | 'page';
  targetId?: string;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('/');
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null); // Ref for the observer instance
  const observedElementsRef = useRef<HTMLElement[]>([]); // Refs for elements being observed

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home', type: 'scroll', targetId: 'home' },
    { href: '/#about', label: 'About', type: 'scroll', targetId: 'about' },
    { href: '/#skills', label: 'Skills', type: 'scroll', targetId: 'skills' },
    { href: '/#projects-preview', label: 'Projects', type: 'scroll', targetId: 'projects-preview' },
    { href: '/contact', label: 'Contact', type: 'page', targetId: '/contact' },
  ];

  useEffect(() => {
    const handleScrollVisuals = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScrollVisuals);
    handleScrollVisuals();
    return () => window.removeEventListener('scroll', handleScrollVisuals);
  }, []);

  // Effect to set active link based on pathname and initial hash (when page loads or pathname changes)
  useEffect(() => {
    const currentHash = window.location.hash.substring(1);
    let newActive = '';

    if (pathname === '/') {
      newActive = currentHash ? `/#${currentHash}` : '/';
    } else {
      const currentPageLink = navLinks.find(link => link.type === 'page' && pathname.startsWith(link.href));
      newActive = currentPageLink ? currentPageLink.href : '';
    }
    // console.log(`Pathname/Hash Effect: Setting activeLink to ${newActive}`);
    setActiveLink(newActive);
  }, [pathname]); // Only depends on pathname to set initial state for the page


  // Intersection Observer for homepage sections
  useEffect(() => {
    // Cleanup previous observer if pathname changes or component unmounts
    if (observerRef.current) {
      observedElementsRef.current.forEach(el => observerRef.current?.unobserve(el));
      observerRef.current.disconnect();
    }
    observedElementsRef.current = []; // Clear observed elements

    if (pathname !== '/') { // Only run observer on the homepage
      return;
    }

    const headerHeight = headerRef.current?.offsetHeight || 70;
    // More precise rootMargin:
    // Top: Makes section active when its top is just below the header.
    // Bottom: -X% from the bottom. A smaller negative value (e.g., -20%) means the section stays active longer.
    // Let's try to make it active when it's in the top ~70% of the viewport below the header.
    const topMargin = -(headerHeight + 20); // 20px buffer below header
    const bottomMargin = -(window.innerHeight - (headerHeight + 20) - 150); // Try to make a 150px "active" strip at the top of viewport
                                                                            // This is tricky, adjust 150px.

    const observerOptions = {
      root: null,
      rootMargin: `${topMargin}px 0px ${bottomMargin}px 0px`,
      threshold: 0.1, // How much of the target is visible
    };

    navLinks.forEach(link => {
      if (link.type === 'scroll' && link.targetId) {
        const element = document.getElementById(link.targetId);
        if (element) {
          observedElementsRef.current.push(element);
        }
      }
    });

    if (observedElementsRef.current.length === 0) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);

      if (intersectingEntries.length > 0) {
        // Find the entry that is "most" visible or highest on the page
        // This simple version takes the first one that started intersecting
        // or the one with the highest ratio if you prefer.
        // Let's try the one whose top is closest to the top of the "active zone"
        intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const mostRelevantEntry = intersectingEntries[0]; // The one highest up in the viewport

        if (mostRelevantEntry) {
          const newActiveHref = `/#${mostRelevantEntry.target.id}`;
          // console.log(`Observer: Intersecting ${mostRelevantEntry.target.id}, current active: ${activeLink}, new: ${newActiveHref}`);
          if (activeLink !== newActiveHref) {
            setActiveLink(newActiveHref);
          }
        }
      } else if (window.scrollY < (headerHeight + 50) && pathname === '/') { // If nothing is intersecting and we are near the top
        if (activeLink !== '/') {
          // console.log("Observer: Scrolled to top, setting activeLink to /");
          setActiveLink('/');
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, observerOptions);
    observedElementsRef.current.forEach(element => observerRef.current?.observe(element));

    return () => {
      if (observerRef.current) {
        observedElementsRef.current.forEach(el => observerRef.current?.unobserve(el));
        observerRef.current.disconnect();
      }
    };
  }, [pathname, navLinks, activeLink]); // Rerun if pathname, links, or activeLink changes. activeLink can help re-evaluate if externally changed.

  const handleScrollTo = (targetId: string, targetHref: string, e?: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);

    // For "Home" link specifically, or any link that should go to the top of the page at '/'
    if (targetHref === '/' && targetId === 'home') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveLink('/'); // Explicitly set Home as active
        if (history.pushState) history.pushState(null, "", "/");
      } else {
        router.push('/'); // Navigate to homepage, activeLink will be set by pathname useEffect
      }
      return;
    }

    // For other scroll links (e.g., /#about, /#skills)
    if (targetHref.startsWith('/#')) {
      setActiveLink(targetHref); // Set active link immediately on click for responsiveness

      if (pathname === '/') { // Scrolling on homepage
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = headerRef.current?.offsetHeight || 70;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
          if (history.pushState) {
            history.pushState(null, "", `#${targetId}`);
          } else {
            window.location.hash = `#${targetId}`;
          }
        }
      } else { // Navigating to homepage section from another page
        router.push(targetHref); // Navigate to homepage with hash, useEffect will set activeLink
      }
    }
  };

  const renderNavLink = (link: NavLink, isMobile: boolean) => {
    const commonClasses = `pb-1 border-b-2 transition-all duration-300 relative group`;
    const mobileCommonClasses = `w-full text-center py-3 rounded-md transition-colors`;

    let isActive = false;
    if (link.type === 'page') {
      isActive = pathname === link.href;
    } else { // type 'scroll'
      if (link.targetId === 'home') { // Special handling for "Home" link
        isActive = (activeLink === '/' || activeLink === '/#home');
      } else {
        isActive = activeLink === link.href;
      }
    }

    const activeClasses = isMobile ? 'bg-[#043CAA]/10 text-[#043CAA] font-semibold' : 'border-[#043CAA] text-[#043CAA] font-semibold';
    const inactiveClasses = isMobile ? 'text-[#575454] hover:bg-[#043CAA]/5 hover:text-[#043CAA]' : 'border-transparent text-[#575454] hover:text-[#043CAA] hover:border-[#043CAA]/50';
    const underlineClass = "after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-[#043CAA] after:transition-all after:duration-300 group-hover:after:w-full";
    const activeUnderlineClass = "after:w-full";

    // For "Home" link and other scroll links
    if (link.type === 'scroll') {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => handleScrollTo(link.targetId as string, link.href, e)}
          className={/* ... classes ... */ isMobile
            ? `${mobileCommonClasses} ${isActive ? activeClasses : inactiveClasses}`
            : `${commonClasses} cursor-pointer ${isActive ? activeClasses : inactiveClasses} ${!isMobile ? (isActive ? activeUnderlineClass : underlineClass) : ''}`
        }
        >
          {link.label}
        </a>
      );
    }

    // For regular page links (like Contact)
    return (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => {
          if (isMobile) setIsMobileMenuOpen(false);
          setActiveLink(link.href);
        }}
        className={/* ... classes ... */ isMobile
            ? `${mobileCommonClasses} ${isActive ? activeClasses : inactiveClasses}`
            : `${commonClasses} ${isActive ? activeClasses : inactiveClasses} ${!isMobile ? (isActive ? activeUnderlineClass : underlineClass) : ''}`
        }
      >
        {link.label}
      </Link>
    );
  };

  // ... (Rest of the return JSX for header structure)
  return (
    <header
      ref={headerRef}
      className={`bg-white/90 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div onClick={(e) => handleScrollTo('home', '/', e)} className="text-2xl font-bold text-[#043CAA] hover:text-[#62B6B8] transition-colors cursor-pointer">
          <div className="flex items-center gap-2">
            <CodeXml size={28} />
            <span>Erudi</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => renderNavLink(link, false))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} className="text-[#043CAA]" /> : <Menu size={24} className="text-[#043CAA]" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md">
          <nav className="flex flex-col items-center space-y-1 p-4">
            {navLinks.map(link => renderNavLink(link, true))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;