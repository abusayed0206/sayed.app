"use client";

import { ProjectCategory } from "@/types/project";

const categories: Array<{ value: ProjectCategory | "All"; label: string }> = [
  { value: "All", label: "All Projects" },
  { value: "Windows", label: "Windows Apps" },
  { value: "Web", label: "Web Applications" },
  { value: "Android", label: "Android Apps" },
  { value: "Others", label: "Libraries & Tools" },
];

interface CategoryFilterProps {
  active: ProjectCategory | "All";
  counts: Record<string, number>;
  onChange: (category: ProjectCategory | "All") => void;
}

export default function CategoryFilter({
  active,
  counts,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 max-w-max mx-auto">
      {categories.map((cat) => {
        const count = cat.value === "All" ? counts["All"] || 0 : counts[cat.value] || 0;
        const isActive = active === cat.value;

        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md ${
              isActive
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60"
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                isActive
                  ? "bg-white/20 dark:bg-neutral-900/20 text-white dark:text-neutral-900"
                  : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
