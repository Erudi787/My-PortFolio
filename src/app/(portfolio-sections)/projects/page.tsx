import ProjectCard from "@/components/sections/ProjectCard";
import { projectsData } from "../../../../lib/data";

export const metadata = {
  title: "Work",
  description:
    "Selected projects — production builds in EdTech, property management, music recommendation, and developer tooling.",
};

export default function ProjectsPage() {
  // Sort newest first
  const sorted = [...projectsData].sort((a, b) => {
    const ay = a.year ? parseInt(a.year, 10) : 0;
    const by = b.year ? parseInt(b.year, 10) : 0;
    return by - ay;
  });

  return (
    <section
      id="projects"
      className="bg-bg text-fg pt-32 pb-32 md:pt-40 md:pb-40 min-h-screen"
    >
      <div className="container mx-auto px-6 md:px-10">
        {/* Tag */}
        <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-accent mb-8 flex items-center gap-2">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
          Selected work
        </p>

        <header className="max-w-4xl mb-20 md:mb-24">
          <h1 className="font-display text-fg text-5xl md:text-7xl lg:text-[6rem]">
            Things I&apos;ve shipped,{' '}
            <span className="font-serif text-fg-muted">chronological</span>.
          </h1>
          <p className="mt-10 text-fg-muted text-base md:text-lg leading-relaxed max-w-2xl">
            From a campus chat app in WinForms to a production
            property-management platform with ten third-party integrations.
            Click any tile for the full case study.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <p className="mt-20 text-sm text-fg-subtle">
          More on{" "}
          <a
            href="https://github.com/Erudi787"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg link-underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
