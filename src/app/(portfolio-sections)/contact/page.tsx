import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Elwison Denampo for collaborations, job opportunities, or inquiries about software development projects.",
};

export default function ContactPage() {
  return (
    <section id="contact" className="py-16 md:py-28 bg-gradient-to-b from-[#F0F4F8] to-white dark:from-[#0B1120] dark:to-[#030712] transition-colors duration-300 relative overflow-hidden min-h-screen">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00C6C6]/5 rounded-full blur-[120px] -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0A4DDE]/5 rounded-full blur-[120px] -z-10 pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0A4DDE] to-[#00C6C6] mb-6 tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out.
            I&apos;m always open to discussing new ideas and opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Contact Form Side */}
          <div className="bg-white/70 dark:bg-[#0B1120]/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/50 dark:border-white/10 relative transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 dark:from-white/5 dark:to-transparent rounded-3xl pointer-events-none" />
            <ContactForm />
          </div>

          {/* Contact Info Side */}
          <div className="space-y-6 mt-4 md:mt-0">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00C6C6] to-[#0A4DDE] mb-8">Contact Information</h3>
            <div className="group flex items-start gap-5 p-6 bg-white/70 dark:bg-[#0B1120]/60 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/10 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,198,198,0.1)] hover:-translate-y-1">
              <Mail size={24} className="text-[#0A4DDE] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-[#0B1120] dark:text-[#f8fafc]">Email</h4>
                <a href="mailto:elwisondenampo@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-[#00C6C6] transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#00C6C6] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  elwisondenampo@gmail.com {/* Replace */}
                </a>
              </div>
            </div>
            <div className="group flex items-start gap-5 p-6 bg-white/70 dark:bg-[#0B1120]/60 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/10 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,198,198,0.1)] hover:-translate-y-1">
              <Phone size={24} className="text-[#00C6C6] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-[#0B1120] dark:text-[#f8fafc]">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+63 945 623 2885</p> {/* Replace or remove */}
              </div>
            </div>
            <div className="group flex items-start gap-5 p-6 bg-white/70 dark:bg-[#0B1120]/60 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/10 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,198,198,0.1)] hover:-translate-y-1">
              <MapPin size={24} className="text-[#0A4DDE] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="font-bold text-[#0B1120] dark:text-[#f8fafc]">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">Naga, Cebu, Philippines</p> {/* Replace */}
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">(Open to remote opportunities)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}