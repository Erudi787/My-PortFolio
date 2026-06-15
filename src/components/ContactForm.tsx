'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

const SUBJECT_PRESETS = [
  'Job opportunity',
  'Freelance project',
  'Collaboration',
  'Just saying hi',
  'Other',
] as const;
type Preset = typeof SUBJECT_PRESETS[number];

export default function ContactForm() {
  const [preset, setPreset] = useState<Preset>('Job opportunity');
  const [customSubject, setCustomSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'' | 'success' | 'error'>('');
  const [errorMsg, setErrorMsg] = useState('');
  const customRef = useRef<HTMLInputElement>(null);

  // When the user picks Other, auto-focus the free-text input
  useEffect(() => {
    if (preset === 'Other') customRef.current?.focus();
  }, [preset]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    setErrorMsg('');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const subject = preset === 'Other'
      ? (customSubject.trim() || 'Other')
      : preset;

    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      subject,
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''), // honeypot
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to send message.');
      }
      setStatus('success');
      form.reset();
      setPreset('Job opportunity');
      setCustomSubject('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full px-4 py-3 rounded-md border border-input bg-background/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/60';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-border shadow-lg space-y-5"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
        <input
          id="name" name="name" type="text" required minLength={2} maxLength={100}
          placeholder="Your name"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
        <input
          id="email" name="email" type="email" required maxLength={254}
          placeholder="you@example.com"
          className={inputCls}
        />
      </div>

      {/* Subject: dropdown until user picks Other, then swaps to free-text */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
          {preset === 'Other' && (
            <button
              type="button"
              onClick={() => { setPreset('Job opportunity'); setCustomSubject(''); }}
              className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={12} /> Back to options
            </button>
          )}
        </div>

        {preset === 'Other' ? (
          <input
            ref={customRef}
            id="subject"
            type="text"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            maxLength={200}
            placeholder="What's on your mind?"
            className={inputCls}
          />
        ) : (
          <select
            id="subject"
            value={preset}
            onChange={(e) => setPreset(e.target.value as Preset)}
            className={`${inputCls} appearance-none bg-[length:1rem_1rem] bg-[right_0.85rem_center] bg-no-repeat`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
              paddingRight: '2.5rem',
            }}
          >
            {SUBJECT_PRESETS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
        <textarea
          id="message" name="message" required minLength={10} maxLength={5000}
          rows={6}
          placeholder="Tell me about your project or opportunity…"
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cosmic-button w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
        <Send size={16} />
      </button>

      {status === 'success' && (
        <p className="text-sm text-center text-primary">
          Message sent — I&apos;ll get back to you within a day or two.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-center text-red-500">
          Failed to send. {errorMsg}
        </p>
      )}
    </form>
  );
}
