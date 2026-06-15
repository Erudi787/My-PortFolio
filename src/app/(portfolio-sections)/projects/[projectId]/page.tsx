// src/app/(portfolio-sections)/projects/[projectId]/page.tsx
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/sections/ProjectDetailClient';
import { projectsData, Project } from '../../../../../lib/data';

export async function generateStaticParams() {
  return projectsData.map((project) => ({ projectId: project.slug }));
}

async function getProject(slug: string): Promise<Project | undefined> {
  return projectsData.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title.split(/\s[—–-]\s/)[0],
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
