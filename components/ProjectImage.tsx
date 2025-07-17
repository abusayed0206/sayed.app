"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Project } from "@/types/project";
import { handleImageError } from "@/lib/utils/imageUtils";

interface ProjectImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  project: Project;
  alt: string;
}

export default function ProjectImage({ project, alt, ...props }: ProjectImageProps) {
  const [imageSrc, setImageSrc] = useState(project.image || handleImageError(project));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(handleImageError(project));
    }
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}
