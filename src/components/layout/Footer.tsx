import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#070B0C] text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://github.com/Erudi787" // Replace
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[#043CAA] transition-colors"
          >
            <FiGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/elwison-l-denampo-b2042b285/" // Replace
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#043CAA] transition-colors"
          >
            <FiLinkedin size={28} />
          </a>
          <a
            href="mailto:elwisondenampo@gmail.com" // Replace
            aria-label="Email"
            className="hover:text-[#043CAA] transition-colors"
          >
            <FiMail size={28} />
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {currentYear} Elwison Denampo. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Built with Next.js & Tailwind CSS. Deployed on Vercel.
        </p>
      </div>
    </footer>
  );
};

export default Footer;