import ProjectCard from "@/components/sections/ProjectCard";
import { projectsData } from "../../../../lib/data";

export const metadata = {
  title: "Projects | Your Name",
  description: "A showcase of backend development projects.",
};

export default function ProjectsPage() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#070B0C] mb-16">
          My Projects
        </h2>
        {projectsData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#575454] text-lg">
            Projects are being added. Please check back soon!
          </p>
        )}
      </div>
    </section>
  );
}