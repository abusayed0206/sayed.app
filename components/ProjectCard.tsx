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

  const isMicrosoftStore = project.livePreview && project.livePreview.includes("apps.microsoft.com");

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <article className="h-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg overflow-hidden flex flex-col hover:border-neutral-400 dark:hover:border-neutral-600">
        {/* Image Container */}
        <div className="relative aspect-[16/9] bg-neutral-100 dark:bg-neutral-950 overflow-hidden border-b border-neutral-200/60 dark:border-neutral-800/60">
          <Image
            src={imgSrc}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            onError={handleImageError}
          />

          {/* Gallery controls */}
          {hasGallery && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black z-10"
                aria-label="Previous screenshot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black z-10"
                aria-label="Next screenshot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {gallery.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full ${idx === galleryIndex ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Pinned badge */}
          {project.pin && (
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-[10px] font-bold uppercase tracking-wider rounded">
              📌 Pinned
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-2.5 right-2.5">
            <CategoryBadge category={project.category} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
              {project.name}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.keywords.slice(0, 3).map((keyword, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium"
              >
                #{keyword}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          {(project.sourceCode || project.livePreview) && (
            <div className="flex items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 mt-auto">
              {project.livePreview && (
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.livePreview, "_blank"); }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                >
                  {isMicrosoftStore ? "MS Store" : "Live Link"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </button>
              )}
              {project.sourceCode && (
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.sourceCode, "_blank"); }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Source
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </button>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
