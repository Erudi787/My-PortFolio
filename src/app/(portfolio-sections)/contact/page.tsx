import type { Metadata } from 'next';
import { Mail, MapPin, FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Elwison Denampo — full-stack developer based in Cebu, Philippines. Open to roles, freelance projects, and collaborations.',
};

export default function ContactPage() {
  return (
    <section className="relative pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Bracketed kicker matches the rei section header pattern */}
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-6 inline-flex items-baseline gap-1.5">
          <span aria-hidden="true">[</span>
          <span className="text-muted-foreground">§ 06</span>
          <span aria-hidden="true" className="text-muted-foreground">·</span>
          <span>Contact · Get in touch</span>
          <span aria-hidden="true">]</span>
        </p>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-start">
          {/* LEFT — intro + contact details */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Let&apos;s work <span className="text-primary">together.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              I&apos;m open to full-time roles, freelance projects, and collaborations.
              Drop a message and I&apos;ll get back to you within a day or two.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:elwisondenampo@gmail.com"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <span className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                elwisondenampo@gmail.com
              </a>

              <a
                href="https://github.com/Erudi787"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <span className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FaGithub size={16} className="text-primary" />
                </span>
                github.com/Erudi787
              </a>

              <a
                href="https://www.linkedin.com/in/elwison-l-denampo-b2042b285/"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <span className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FaLinkedin size={16} className="text-primary" />
                </span>
                linkedin.com/in/elwison-l-denampo
              </a>

              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="p-2 rounded-md bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                Naga, Cebu, Philippines · GMT+8
              </div>
            </div>

            <a
              href="/resume/ElwisonDenampo_SoftwareEngineer_Resume.pdf"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-primary/60 hover:text-primary transition-colors text-sm"
            >
              <FileDown size={16} />
              Download resume
            </a>
          </div>

          {/* RIGHT — form card */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
