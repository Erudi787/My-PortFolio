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
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
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
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#070B0C] mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#043CAA]/50 focus:border-[#043CAA] transition-colors text-sm text-[#070B0C]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#070B0C] mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#043CAA]/50 focus:border-[#043CAA] transition-colors text-sm text-[#070B0C]"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#070B0C] mb-1">Subject (Optional)</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#043CAA]/50 focus:border-[#043CAA] transition-colors text-sm text-[#070B0C]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#070B0C] mb-1">Message</label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#043CAA]/50 focus:border-[#043CAA] transition-colors text-sm resize-none text-[#070B0C]"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full flex items-center justify-center gap-2 bg-[#043CAA] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#043CAA]/90 transition-colors text-base shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} />
        </button>
      </div>
      {status === 'success' && <p className="text-green-600 text-sm text-center">Message sent successfully! I&apos;ll get back to you soon.</p>}
      {status === 'error' && <p className="text-red-600 text-sm text-center">Error: {error}</p>}
    </motion.form>
  );
};

export default ContactForm;