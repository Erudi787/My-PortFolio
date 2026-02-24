import Link from "next/link";
import * as motion from "framer-motion/client";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectCard from "../components/sections/ProjectCard"; // We'll make a preview section
import { projectsData } from "../../lib/data"; // Your projects data

export default function Home() {
  const featuredProjects = projectsData.slice(0, 2); // Show first 2 projects as example

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />

      {/* Featured Projects Section */}
      <section id="projects-preview" className="py-16 md:py-28 bg-white dark:bg-[#030712] transition-colors duration-300 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#0A4DDE] to-[#00C6C6] mb-12 mt-4"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link href="/projects"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#0B1120] dark:bg-white text-white dark:text-[#0B1120] rounded-full font-semibold text-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto"
            >
              <span className="relative z-10">View All Projects</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#00C6C6] to-[#0A4DDE] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}