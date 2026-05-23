'use client';
import { useState, ChangeEvent, FormEvent } from 'react';

const fieldClass =
  'w-full bg-bg-elevated/40 border border-border focus:border-accent rounded-lg focus:outline-none focus:ring-0 px-4 py-3 text-base text-fg placeholder:text-fg-subtle/70 transition-colors';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot
  });
  const [status, setStatus] = useState<'' | 'sending' | 'success' | 'error'>('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          name="website"
          id="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[12px] font-medium text-fg-muted mb-2">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={fieldClass}
            placeholder="What should I call you?"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[12px] font-medium text-fg-muted mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={fieldClass}
            placeholder="you@somewhere.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-[12px] font-medium text-fg-muted mb-2">
          Subject <span className="text-fg-subtle/60">(optional)</span>
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className={fieldClass}
          placeholder="A line so I can scan my inbox"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[12px] font-medium text-fg-muted mb-2">Message</label>
        <textarea
          name="message"
          id="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className={`${fieldClass} resize-none`}
          placeholder="What are you working on?"
        />
      </div>

      <div className="pt-2 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bloom inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-fg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[14px] font-semibold"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
          <span aria-hidden="true">→</span>
        </button>

        {status === 'success' && (
          <p className="text-[12px] text-fg-muted">
            <span className="text-[color:var(--signal-live)]">●</span> Sent — reply incoming
          </p>
        )}
        {status === 'error' && (
          <p className="text-[12px] text-fg-muted">
            <span className="text-red-500">●</span> Failed · {error}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
