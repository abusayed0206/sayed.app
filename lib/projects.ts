import data from "@/public/data/projects.json";
import type { Project, ProjectCategory } from "@/types/project";

/** Hand-ordered in the JSON: featured first, then by category. */
export const projects = data as Project[];

export const categories: { id: ProjectCategory; title: string; short: string; blurb: string }[] = [
  { id: "windows", title: "Windows apps", short: "Windows", blurb: "Native, offline-first apps on the Microsoft Store." },
  { id: "web", title: "Web apps & tools", short: "Web", blurb: "Sites, APIs and extensions, mostly on Cloudflare's edge." },
  { id: "other", title: "Libraries & data", short: "Libraries", blurb: "Crates, MCP servers and open-data work." },
  { id: "academic", title: "Engineering & research", short: "Research", blurb: "Structural, geotechnical and water projects from CUET." },
];

export const categoryOf = (id: ProjectCategory) => categories.find((c) => c.id === id)!;

/** CSS variable holding the category's colour (defined in globals.css). */
export const categoryColor = (id: ProjectCategory) => `var(--cat-${id})`;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function related(p: Project, n = 3) {
  return projects.filter((q) => q.slug !== p.slug && q.category === p.category).slice(0, n);
}
