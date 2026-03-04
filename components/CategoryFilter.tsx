"use client";

import { ProjectCategory } from "@/types/project";

const categories: Array<{ value: ProjectCategory | "All"; label: string }> = [
  { value: "All", label: "All" },
  { value: "Web", label: "Web" },
  { value: "Windows", label: "Windows" },
  { value: "Android", label: "Android" },
  { value: "Others", label: "Others" },
];

interface CategoryFilterProps {
  active: ProjectCategory | "All";
  counts: Record<string, number>;
  onChange: (category: ProjectCategory | "All") => void;
}

export default function CategoryFilter({ active, counts, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => {
        const count = cat.value === "All" ? counts["All"] || 0 : counts[cat.value] || 0;
        const isActive = active === cat.value;

        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={`filter-tab inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium transition-colors border ${
              isActive
                ? "border-[var(--color-text)] dark:border-[var(--color-text-dark)] bg-[var(--color-text)] dark:bg-[var(--color-text-dark)] text-[var(--color-bg)] dark:text-[var(--color-bg-dark)]"
                : "border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)] hover:border-[var(--color-text-muted)] dark:hover:border-[var(--color-text-muted-dark)]"
            }`}
          >
            {cat.label}
            <span className={`text-[10px] ${isActive ? "opacity-70" : "opacity-50"}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
