// Single-page composition — Rei's section flow with our content.
// Contact lives on its own /contact page (linked from Navbar + Hero CTA).
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import WorkExperienceSection from '@/components/sections/WorkExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkExperienceSection />
      <SkillsSection />
      <ProjectsSection />
    </>
  );
}
