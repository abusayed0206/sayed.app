import Image from "next/image";
import type { Project } from "@/types/project";
import { categoryColor } from "@/lib/projects";

/** Screenshot when the project has one, otherwise a generated typographic cover in the category colour. */
export default function ProjectCover({ project, className = "", priority }: { project: Project; className?: string; priority?: boolean }) {
  const color = categoryColor(project.category);
  if (project.image) {
    return (
      <div className={`relative overflow-hidden bg-surface ${className}`}>
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden bg-grid [container-type:size] ${className}`}
      style={{ backgroundColor: `color-mix(in oklab, ${color} 14%, var(--paper))` }}
    >
      {/* Sized in container units so the letter fits any cover shape. */}
      <div
        className="absolute right-[8cqw] bottom-[-14cqh] font-serif italic leading-none select-none"
        style={{ color, fontSize: "min(95cqh, 60cqw)" }}
      >
        {project.name.replace(/^[^A-Za-z0-9]+/, "").charAt(0)}
      </div>
      <div className="absolute left-4 bottom-4 max-w-[55%] font-serif text-[min(9cqh,2rem)] leading-tight text-headings/80">
        {project.name}
      </div>
      <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
        {project.platforms.map((p) => (
          <span key={p} className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border" style={{ color, borderColor: color }}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
