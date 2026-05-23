'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactPageClient() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section
      id="contact"
      className="bg-bg text-fg pt-32 pb-32 md:pt-40 md:pb-40 min-h-screen relative overflow-hidden"
    >
      {/* Subtle iris bloom in the background */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] max-w-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, color-mix(in oklch, var(--accent) 14%, transparent) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <p className="text-[12px] font-mono uppercase tracking-[0.22em] text-accent mb-8 inline-flex items-baseline gap-1.5">
          <span aria-hidden="true">[</span>
          <span className="text-fg-muted">contact</span>
          <span aria-hidden="true" className="text-fg-subtle">·</span>
          <span>Get in touch</span>
          <span aria-hidden="true">]</span>
        </p>

        <div className="max-w-4xl">
          <h1 className="font-display text-fg text-5xl md:text-7xl lg:text-[6rem]">
            Have something{' '}
            <span className="font-serif text-fg-muted">worth shipping?</span>
          </h1>

          <p className="mt-10 text-fg-muted text-base md:text-lg leading-relaxed max-w-2xl">
            The fastest way to reach me is email. I read everything and reply
            to most things within a few days.
          </p>

          <a
            href="mailto:elwisondenampo@gmail.com"
            className="bloom group inline-block mt-12 md:mt-16"
          >
            <span className="font-display text-fg group-hover:text-accent transition-colors text-3xl md:text-5xl lg:text-6xl break-all">
              elwisondenampo@gmail.com
            </span>
          </a>

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-[14px]">
            <a
              href="https://github.com/Erudi787"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg transition-colors link-underline"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/elwison-l-denampo-b2042b285/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-fg transition-colors link-underline"
            >
              LinkedIn ↗
            </a>
            <span className="text-fg-subtle">·</span>
            <span className="text-fg-muted">Naga, Cebu, PH · GMT+8</span>
            <span className="text-fg-subtle">·</span>
            <span className="inline-flex items-baseline gap-2 text-fg-muted">
              <span aria-hidden="true" className="relative inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--signal-live)] translate-y-[1px]">
                <span className="absolute inset-0 rounded-full bg-[color:var(--signal-live)] motion-safe:animate-ping opacity-70" />
              </span>
              Open to remote roles
            </span>
          </div>

          <div className="mt-20 pt-12 border-t border-border">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="text-[14px] text-fg-muted hover:text-fg transition-colors link-underline"
              >
                Or send a structured message →
              </button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 28, mass: 0.9 }}
                  className="max-w-2xl"
                >
                  <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-fg-subtle mb-8">
                    Send a message
                  </p>
                  <ContactForm />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
