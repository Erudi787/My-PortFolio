import AboutSection from "@/components/sections/AboutSection";

export const metadata = {
  title: "About Me | Your Name - Backend Developer",
  description: "Learn more about my journey, experience, and technical philosophy as a backend developer.",
};

export default function AboutPage() {
  return (
    // You can add page-specific layout or introductory text here if needed
    // For now, it will directly render the AboutSection
    <AboutSection />
  );
}