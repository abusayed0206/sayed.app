import Link from "next/link";
import type { Project } from "@/types/project";
import { categoryColor, categoryOf } from "@/lib/projects";
import ProjectCover from "@/components/ProjectCover";

export default function ProjectCard({ project, large, priority }: { project: Project; large?: boolean; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgb(0_0_0/0.25)] focus-visible:outline-2 focus-visible:outline-primary"
    >
      <ProjectCover project={project} priority={priority} className={`${large ? "aspect-[16/9] lg:aspect-auto lg:flex-1 lg:min-h-72" : "aspect-[16/9]"} border-b border-border`} />
      <div className="p-5 flex flex-col gap-2">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="size-1.5 rounded-full" style={{ background: categoryColor(project.category) }} aria-hidden />
          {categoryOf(project.category).short}
          {project.year && <span>· {project.year}</span>}
        </p>
        <h3 className={`font-serif text-headings leading-tight ${large ? "text-4xl" : "text-2xl"}`}>
          {project.name}
          <span className="inline-block ml-1 text-primary transition-transform group-hover:translate-x-1" aria-hidden>→</span>
        </h3>
        <p className="text-sm leading-relaxed">{large ? project.summary : project.tagline}</p>
        {project.metrics && (
          <p className="mt-1 flex gap-4 font-mono text-xs text-muted-foreground">
            {project.metrics.map((m) => (
              <span key={m.label}>
                <span className="text-headings">{m.value}</span> {m.label}
              </span>
            ))}
          </p>
        )}
      </div>
    </Link>
  );
}
