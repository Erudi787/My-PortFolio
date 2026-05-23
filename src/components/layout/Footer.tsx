import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  // Items carried by the iris marquee strip — duplicated twice in the
  // render so the -50% translateX wraps seamlessly.
  const marqueeItems = [
    'Elwison Denampo',
    '★',
    'Available for remote roles',
    '★',
    'Cebu · GMT+8',
    '★',
    'Building LaChowOS',
    '★',
    'Last 12 months: 45+ NestJS modules, 10+ integrations',
    '★',
  ];

  return (
    <footer className="bg-bg-deep text-fg border-t border-border">
      {/* Iris marquee strip — the bold-flavored signature moment */}
      <div
        className="marquee-container overflow-hidden border-b border-border"
        style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
      >
        <div className="marquee py-3" aria-hidden="true">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-display text-[1.35rem] md:text-[1.65rem] px-5 whitespace-nowrap tracking-[-0.02em] leading-none"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* Big wordmark — almost takes the column */}
        <Link href="/" className="block group">
          <span className="font-display text-fg group-hover:text-accent transition-colors text-5xl md:text-7xl lg:text-[6rem] block leading-none">
            Elwison Denampo.
          </span>
        </Link>

        <div className="grid grid-cols-12 gap-x-8 gap-y-12 mt-16">
          <div className="col-span-12 md:col-span-5">
            <p className="text-fg-muted text-base max-w-sm leading-relaxed">
              Full-stack engineer building production systems. Working quietly
              out of Cebu, Philippines.
            </p>
            <div className="mt-6 inline-flex items-baseline gap-2 text-[13px] text-fg-muted">
              <span aria-hidden="true" className="relative inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--signal-live)] translate-y-[1px]">
                <span className="absolute inset-0 rounded-full bg-[color:var(--signal-live)] motion-safe:animate-ping opacity-70" />
              </span>
              Available for remote roles
            </div>
          </div>

          <nav aria-label="Footer navigation" className="col-span-6 md:col-span-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-5">
              Pages
            </p>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/" className="text-fg-muted hover:text-fg transition-colors link-underline">Home</Link></li>
              <li><Link href="/#about" className="text-fg-muted hover:text-fg transition-colors link-underline">About</Link></li>
              <li><Link href="/projects" className="text-fg-muted hover:text-fg transition-colors link-underline">Work</Link></li>
              <li><Link href="/contact" className="text-fg-muted hover:text-fg transition-colors link-underline">Contact</Link></li>
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-5">
              Elsewhere
            </p>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a href="https://github.com/Erudi787" target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg transition-colors">
                  GitHub <span className="text-fg-subtle">↗</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/elwison-l-denampo-b2042b285/" target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg transition-colors">
                  LinkedIn <span className="text-fg-subtle">↗</span>
                </a>
              </li>
              <li>
                <a href="mailto:elwisondenampo@gmail.com" className="text-fg-muted hover:text-fg transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-fg-subtle">
          <p>© {year} Elwison Denampo</p>
          <p>Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
