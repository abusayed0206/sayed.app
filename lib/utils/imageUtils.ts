import { Project } from '@/types/project';

export function getProjectImageUrl(project: Project): string {
  if (!project.image) {
    // Generate OG image URL when no image is provided
    return generateOGImageUrl(project);
  }
  
  // For now, assume all images exist if they're provided
  // In a real-world scenario, you might want to add image validation
  return project.image;
}

export function generateOGImageUrl(project: Project): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://sayed.app' 
    : 'http://localhost:3000';
  
  const params = new URLSearchParams({
    title: project.name,
    description: project.description,
    keywords: project.keywords.join(','),
    academic: project.academic.toString(),
  });

  return `${baseUrl}/api/og/project?${params.toString()}`;
}

export function handleImageError(project: Project): string {
  // This function returns the OG image URL to use as fallback
  return generateOGImageUrl(project);
}
