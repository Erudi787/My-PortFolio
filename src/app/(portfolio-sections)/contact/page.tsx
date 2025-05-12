import ContactForm from "@/components/sections/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact | Your Name",
  description: "Get in touch for collaborations or inquiries.",
};

export default function ContactPage() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#070B0C] mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-[#575454] leading-relaxed">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out.
            I&apos;m always open to discussing new ideas and opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Contact Form Side */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-200">
            <ContactForm />
          </div>

          {/* Contact Info Side */}
          <div className="space-y-8 mt-4 md:mt-0">
            <h3 className="text-2xl font-semibold text-[#070B0C] mb-6">Contact Information</h3>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <Mail size={24} className="text-[#043CAA] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#070B0C]">Email</h4>
                <a href="mailto:youremail@example.com" className="text-[#575454] hover:text-[#043CAA] transition-colors">
                  elwisondenampo@gmail.com {/* Replace */}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <Phone size={24} className="text-[#043CAA] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#070B0C]">Phone</h4>
                <p className="text-[#575454]">+63 945 623 2885</p> {/* Replace or remove */}
              </div>
            </div>
             <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <MapPin size={24} className="text-[#043CAA] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#070B0C]">Location</h4>
                <p className="text-[#575454]">Naga, Cebu, Philippines</p> {/* Replace */}
                <p className="text-sm text-gray-400">(Open to remote opportunities)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}