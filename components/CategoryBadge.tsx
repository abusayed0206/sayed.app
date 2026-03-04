"use client";

import { ProjectCategory } from "@/types/project";

interface CategoryBadgeProps {
  category: ProjectCategory;
  className?: string;
}

export default function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  return (
    <span className={`cat-badge bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] ${className}`}>
      {category}
    </span>
  );
}
