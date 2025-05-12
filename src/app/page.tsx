import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectCard from "../components/sections/ProjectCard"; // We'll make a preview section
import { projectsData } from "../../lib/data"; // Your projects data
import Link from "next/link";

export default function Home() {
  const featuredProjects = projectsData.slice(0, 2); // Show first 2 projects as example

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />

      {/* Featured Projects Section */}
      <section id="projects-preview" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#070B0C] mb-12">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/projects"
              className="bg-[#043CAA] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#043CAA]/90 transition-colors text-lg shadow-md hover:shadow-lg"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}