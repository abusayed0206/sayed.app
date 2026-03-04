"use client";
import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Project, ProjectCategory } from "@/types/project";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All",
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data: Project[] = await response.json();
        const sorted = data.sort((a, b) => {
          if (a.pin && !b.pin) return -1;
          if (!a.pin && b.pin) return 1;
          return a.id - b.id;
        });
        setProjects(sorted);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Category filter */}
        <div className="pt-8 pb-6 flex justify-center">
          <CategoryFilter
            active={activeCategory}
            counts={categoryCounts}
            onChange={setActiveCategory}
          />
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && projects.length > 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
              No projects in this category.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-1.5 text-xs text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] underline"
            >
              Show all
            </button>
          </div>
        )}

        {/* Loading */}
        {projects.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] overflow-hidden animate-pulse"
              >
                <div className="aspect-[16/9] bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)]" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] w-3/4" />
                  <div className="h-2.5 bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] w-full" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
