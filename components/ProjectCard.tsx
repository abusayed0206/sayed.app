"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/types/project";
import CategoryBadge from "./CategoryBadge";
import { getProjectImageUrl } from "@/lib/utils/imageUtils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = getProjectImageUrl(project);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [imgError, setImgError] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [];
  const hasGallery = gallery.length > 1;

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(`/api/og/project?title=${encodeURIComponent(project.name)}`);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasGallery) {
      const next = (galleryIndex + 1) % gallery.length;
      setGalleryIndex(next);
      setImgSrc(gallery[next]);
      setImgError(false);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasGallery) {
      const prev = (galleryIndex - 1 + gallery.length) % gallery.length;
      setGalleryIndex(prev);
      setImgSrc(gallery[prev]);
      setImgError(false);
    }
  };

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <article className="project-card border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[16/9] bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] overflow-hidden">
          <Image
            src={imgSrc}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            onError={handleImageError}
          />

          {hasGallery && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
                {gallery.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-1 h-1 rounded-full ${idx === galleryIndex ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}

          {project.pin && (
            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[var(--color-text)] dark:bg-[var(--color-text-dark)] text-[var(--color-bg)] dark:text-[var(--color-bg-dark)] text-[10px] font-medium uppercase tracking-wide">
              Pinned
            </div>
          )}

          <div className="absolute top-1.5 right-1.5">
            <CategoryBadge category={project.category} />
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-text-dark)] mb-1 line-clamp-2 leading-snug group-hover:underline">
            {project.name}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] line-clamp-2 mb-2 leading-relaxed">
            {project.description}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-1">
            {project.keywords.slice(0, 3).map((keyword, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.5 bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          {(project.sourceCode || project.livePreview) && (
            <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              {project.livePreview && (
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.livePreview, "_blank"); }}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-[11px] font-medium bg-[var(--color-text)] dark:bg-[var(--color-text-dark)] text-[var(--color-bg)] dark:text-[var(--color-bg-dark)] hover:opacity-80 transition-opacity"
                >
                  Live Demo
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </button>
              )}
              {project.sourceCode && (
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.sourceCode, "_blank"); }}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-[11px] font-medium border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)] hover:border-[var(--color-text-muted)] dark:hover:border-[var(--color-text-muted-dark)] transition-colors"
                >
                  Source
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </button>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
