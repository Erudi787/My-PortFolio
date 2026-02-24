import ProjectCard from "@/components/sections/ProjectCard";
import { projectsData } from "../../../../lib/data";

export const metadata = {
  title: "Projects",
  description: "A showcase of backend development projects including AI-powered platforms, health management systems, and library management applications.",
};

export default function ProjectsPage() {
  return (
    <section id="projects" className="py-16 md:py-28 bg-gradient-to-b from-[#F0F4F8] to-white relative overflow-hidden min-h-screen">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0A4DDE]/5 rounded-full blur-[100px] -z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00C6C6]/5 rounded-full blur-[100px] -z-10 pointer-events-none transform translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#0A4DDE] to-[#00C6C6] mb-16 tracking-tight">
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