// Single-page composition — Rei's section flow with our content
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import WorkExperienceSection from '@/components/sections/WorkExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
