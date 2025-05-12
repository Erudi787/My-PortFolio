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
    <section className="py-16 md:py-24 bg-[#F8F9FA] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <Link href="/projects" className="text-[#043CAA] hover:text-[#62B6B8] transition-colors inline-flex items-center group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to All Projects
          </Link>
        </div>
        {/* Pass the project data to the Client Component */}
        <ProjectDetailClient project={project} />
      </div>
    </section>
  );
}