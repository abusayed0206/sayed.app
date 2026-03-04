import { Project } from '@/types/project';

export function getProjectImageUrl(project: Project): string {
  if (!project.image) {
    return generateOGImageUrl(project);
  }
  return project.image;
}

export function generateOGImageUrl(project: Project): string {
  const params = new URLSearchParams({
    title: project.name,
  });
  return `/api/og/project?${params.toString()}`;
}

export function handleImageError(project: Project): string {
  return generateOGImageUrl(project);
}
