"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types/project";
import { categories, categoryColor, categoryOf } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

type View = "list" | "grid";

export default function ProjectIndex({ projects, initialCategory }: { projects: Project[]; initialCategory?: ProjectCategory }) {
  const [cat, setCat] = useState<ProjectCategory | "all">(initialCategory ?? "all");
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("list");

  // Keep ?c= in the URL so filtered views can be shared.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (cat === "all") url.searchParams.delete("c");
    else url.searchParams.set("c", cat);
    window.history.replaceState(null, "", url);
  }, [cat]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (!needle ||
          [p.name, p.tagline, p.summary, ...p.tags, ...p.platforms, ...(p.stack ?? [])].join(" ").toLowerCase().includes(needle)),
    );
  }, [projects, cat, q]);

  const count = (c: ProjectCategory) => projects.filter((p) => p.category === c).length;
  const tab = (on: boolean) =>
    `shrink-0 px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
      on ? "bg-headings text-background border-headings" : "border-border hover:border-muted-foreground hover:text-headings"
    }`;

  return (
    <div>
      <div className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-background/90 backdrop-blur-md border-b border-border flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" role="tablist" aria-label="Category">
          <button role="tab" aria-selected={cat === "all"} className={tab(cat === "all")} onClick={() => setCat("all")}>
            All <span className="font-mono text-xs opacity-60">{projects.length}</span>
          </button>
          {categories.map((c) => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} className={tab(cat === c.id)} onClick={() => setCat(c.id)}>
              <span className="inline-block size-1.5 rounded-full mr-1.5 align-middle" style={{ background: categoryColor(c.id) }} aria-hidden />
              {c.short} <span className="font-mono text-xs opacity-60">{count(c.id)}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 lg:ml-auto">
          <label className="flex-1 lg:w-64 flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card focus-within:border-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="text-muted-foreground">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              aria-label="Search projects"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects"
              className="w-full bg-transparent text-sm text-headings placeholder:text-muted-foreground outline-none"
            />
          </label>
          <div className="flex rounded-full border border-border p-0.5" role="group" aria-label="View">
            {(["list", "grid"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`px-3 text-xs font-mono uppercase rounded-full ${view === v ? "bg-surface text-headings" : "text-muted-foreground"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-muted-foreground" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
        {cat !== "all" && <> · {categoryOf(cat).blurb}</>}
      </p>

      {shown.length === 0 ? (
        <p className="py-16 text-center">
          Nothing matches “{q}”.{" "}
          <button className="text-primary link-underline" onClick={() => { setQ(""); setCat("all"); }}>
            Clear filters
          </button>
        </p>
      ) : view === "grid" ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      ) : (
        <ol className="mt-4 border-t border-border">
          {shown.map((p, i) => (
            <li key={p.slug} className="border-b border-border">
              <Link
                href={`/projects/${p.slug}`}
                className="group grid grid-cols-[2.25rem_1fr_auto] sm:grid-cols-[3rem_1.2fr_1.6fr_9rem_3.5rem] gap-x-4 gap-y-1 items-baseline py-4 px-2 -mx-2 rounded-lg hover:bg-surface transition-colors"
              >
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-xl sm:text-2xl text-headings leading-tight">
                  {p.name}
                  <span className="ml-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>→</span>
                </span>
                <span className="col-start-2 sm:col-start-auto text-sm leading-snug">{p.tagline}</span>
                <span className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span className="size-1.5 rounded-full shrink-0" style={{ background: categoryColor(p.category) }} aria-hidden />
                  {p.platforms.join(" · ")}
                </span>
                <span className="row-start-1 col-start-3 sm:row-start-auto sm:col-start-auto font-mono text-xs text-muted-foreground text-right">
                  {p.year ?? ""}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
