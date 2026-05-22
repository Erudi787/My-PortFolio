import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import MetricsSection from "@/components/sections/MetricsSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectCard from "../components/sections/ProjectCard";
import { projectsData } from "../../lib/data";

const FEATURED_SLUGS = ["lachowos-property-management", "futurethink-edge"];

export default function Home() {
  const featured = FEATURED_SLUGS
    .map(slug => projectsData.find(p => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <HeroSection />
      <MetricsSection />
      <AboutSection />
      <SkillsSection />

      {/* Featured work */}
      <section
        id="projects-preview"
        className="bg-bg text-fg py-28 md:py-40 border-t border-border"
      >
        <div className="container mx-auto px-6 md:px-10">
          {/* Section tag */}
          <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-accent mb-8 flex items-center gap-2">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
            Selected work
          </p>

          {/* Headline */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16 md:mb-20">
            <h2 className="font-display text-fg max-w-3xl text-4xl md:text-5xl lg:text-6xl">
              Two builds I&apos;d walk through{' '}
              <span className="font-serif text-fg-muted">in any interview</span>.
            </h2>
            <Link
              href="/projects"
              className="text-[13px] font-medium text-fg-muted hover:text-fg transition-colors link-underline"
            >
              View archive →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
