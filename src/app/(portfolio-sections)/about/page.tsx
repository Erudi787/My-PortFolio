import AboutSection from "@/components/sections/AboutSection";

export const metadata = {
  title: "About Me",
  description: "Learn about Elwison Denampo's journey as a Software Engineer, technical experience with FastAPI, Next.js, and PostgreSQL, and philosophy on building scalable systems.",
};

export default function AboutPage() {
  return (
    // You can add page-specific layout or introductory text here if needed
    // For now, it will directly render the AboutSection
    <AboutSection />
  );
}