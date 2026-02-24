// src/app/(portfolio-sections)/projects/[projectId]/page.tsx
import { projectsData, Project } from '../../../../../lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/sections/ProjectDetailClient'; // Import the Client Component
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    projectId: project.slug,
  }));
}

async function getProject(slug: string): Promise<Project | undefined> {
  return projectsData.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = await params;

  const projectId = resolvedParams.projectId;

  const project = await getProject(projectId);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} | Project Details - [Your Name]`, // Add your name
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = await params;

  const projectId = resolvedParams.projectId;

  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-[#F0F4F8] to-white min-h-screen relative overflow-hidden">
      {/* Immersive Background Effects */}
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-[#00C6C6]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#0A4DDE]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 relative z-10">
          <Link href="/projects" className="inline-flex items-center text-gray-600 hover:text-[#00C6C6] font-medium transition-colors group relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-2px] after:left-0 after:bg-[#00C6C6] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to All Projects
          </Link>
        </div>
        {/* Pass the project data to the Client Component */}
        <ProjectDetailClient project={project} />
      </div>
    </section>
  );
}