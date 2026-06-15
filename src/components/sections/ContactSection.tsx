'use client';

import { useState, FormEvent } from 'react';
import { Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'' | 'success' | 'error'>('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: '',
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''), // honeypot
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
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Open to new roles, project collaborations, and coffee chats.
          <br />
          The fastest way to reach me is email.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-left">Email</h4>
                  <a
                    href="mailto:elwisondenampo@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    elwisondenampo@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-left">Phone</h4>
                  <a
                    href="tel:+639456232885"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +63 945 623 2885
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-left">Location</h4>
                  <span className="text-muted-foreground">
                    Naga, Cebu, Philippines · GMT+8
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4 text-center">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/elwison-l-denampo-b2042b285/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors duration-200" />
                </a>
                <a
                  href="https://github.com/Erudi787"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} className="text-muted-foreground hover:text-primary transition-colors duration-200" />
                </a>
              </div>
            </div>
          </div>

          {/* Right — form (uses our /api/contact backend) */}
          <div className="bg-card p-8 rounded-lg shadow-sm border border-border">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Send a Message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-left">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-left">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@somewhere.com"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-left">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Hello, I have something to discuss..."
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cosmic-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
                <Send size={16} />
              </button>

              {status === 'success' && (
                <p className="text-sm text-center text-primary">
                  Message sent — reply incoming.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-center text-red-500">
                  Failed to send. {errorMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
