'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field - should remain empty
  });
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setFormData({ name: '', email: '', subject: '', message: '', website: '' }); // Reset form
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6 relative"
    >
      {/* Honeypot field - hidden from users, catches bots */}
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
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 bg-white/50 dark:bg-[#0B1120]/50 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm focus:ring-2 focus:ring-[#00C6C6]/50 focus:border-[#00C6C6] focus:bg-white dark:focus:bg-[#0B1120]/80 transition-all duration-300 text-sm text-[#0B1120] dark:text-[#f8fafc] placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 bg-white/50 dark:bg-[#0B1120]/50 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm focus:ring-2 focus:ring-[#00C6C6]/50 focus:border-[#00C6C6] focus:bg-white dark:focus:bg-[#0B1120]/80 transition-all duration-300 text-sm text-[#0B1120] dark:text-[#f8fafc] placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject (Optional)</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-5 py-3 bg-white/50 dark:bg-[#0B1120]/50 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm focus:ring-2 focus:ring-[#00C6C6]/50 focus:border-[#00C6C6] focus:bg-white dark:focus:bg-[#0B1120]/80 transition-all duration-300 text-sm text-[#0B1120] dark:text-[#f8fafc] placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Project Inquiry"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 bg-white/50 dark:bg-[#0B1120]/50 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm focus:ring-2 focus:ring-[#00C6C6]/50 focus:border-[#00C6C6] focus:bg-white dark:focus:bg-[#0B1120]/80 transition-all duration-300 text-sm resize-none text-[#0B1120] dark:text-[#f8fafc] placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="How can I help you?"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full flex items-center justify-center gap-2 bg-[#0A4DDE] text-white px-6 py-4 rounded-xl font-semibold shadow-[0_0_20px_rgba(10,77,222,0.3)] hover:shadow-[0_0_40px_rgba(10,77,222,0.5)] transition-all duration-300 transform hover:-translate-y-1 text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden relative"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10">{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
          <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
      {status === 'success' && <p className="text-green-600 text-sm text-center">Message sent successfully! I&apos;ll get back to you soon.</p>}
      {status === 'error' && <p className="text-red-600 text-sm text-center">Error: {error}</p>}
    </motion.form>
  );
};

export default ContactForm;