import type { Metadata } from "next";
import ProjectIndex from "@/components/ProjectIndex";
import { categories, projects } from "@/lib/projects";
import type { ProjectCategory } from "@/types/project";

export const metadata: Metadata = {
  title: "Index of projects",
  description: "Every app, tool, library and research project by Abu Sayed, searchable and filterable.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const initial = categories.some((x) => x.id === c) ? (c as ProjectCategory) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="pt-14 pb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">The index</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-7xl text-headings leading-[0.95] tracking-tight">
            Everything I&apos;ve <em className="text-primary">shipped</em>.
          </h1>
        </div>
        <dl className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
          {categories.map((x) => (
            <div key={x.id}>
              <dt className="text-xs text-muted-foreground">{x.short}</dt>
              <dd className="text-2xl text-headings">{projects.filter((p) => p.category === x.id).length}</dd>
            </div>
          ))}
        </dl>
      </header>
      <ProjectIndex projects={projects} initialCategory={initial} />
    </div>
  );
}
