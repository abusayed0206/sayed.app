"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Project, ProjectCategory } from "@/types/project";
import { FaGithub, FaMicrosoft } from "react-icons/fa";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    return projects.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const pinnedProjects = useMemo(() => {
    return projects.filter((p) => p.pin);
  }, [projects]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const windowsAppCount = categoryCounts["Windows"] || 0;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <Header />

      {/* Hero Section - Centered Layout */}
      <section className="py-12 sm:py-16 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Centered DP / Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-neutral-300 dark:border-neutral-700 shadow-xs mx-auto">
            <Image
              src="/imgs/sayed.webp"
              alt="Abu Sayed"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Name & Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Abu Sayed <span className="font-normal text-neutral-500 dark:text-neutral-400 text-2xl sm:text-3xl">(সাঈদ)</span>
            </h1>
            <p className="text-sm sm:text-base font-semibold text-neutral-600 dark:text-neutral-400">
              M.Sc. Student @ TU Darmstadt • CUET Graduate
            </p>
          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Projects include offline-first Windows desktop applications, web platforms, Bengali typography solutions (<a href="https://kriti.app" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-neutral-900 dark:hover:text-neutral-100">kriti.app</a>), and open-source packages.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold pt-1">
            <div className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <span className="text-neutral-900 dark:text-neutral-100 font-bold">{projects.length}</span> <span className="text-neutral-500">Total Projects</span>
            </div>
            <div className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <span className="text-neutral-900 dark:text-neutral-100 font-bold">{windowsAppCount}</span> <span className="text-neutral-500">Windows Apps</span>
            </div>
            <div className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <span className="text-neutral-900 dark:text-neutral-100 font-bold">315+</span> <span className="text-neutral-500">Bangla Fonts CDN</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="https://github.com/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
            >
              <FaGithub className="w-3.5 h-3.5" />
              GitHub Profile
            </a>
            <a
              href="https://apps.microsoft.com/search/publisher?name=abusayed.dev&hl=en-US&gl=BD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <FaMicrosoft className="w-3.5 h-3.5" />
              Microsoft Store
            </a>
            <a
              href="https://sayed.page"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Resume / CV →
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Centered Search & Category Filter Section */}
        <div className="space-y-5 text-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Project Catalog</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Search and filter across all desktop apps, web platforms, and open-source packages.</p>
          </div>

          {/* Centered Search Input */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search projects by title, tag, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 shadow-2xs"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Centered Compact Category Filter */}
          <div className="flex justify-center">
            <CategoryFilter
              active={activeCategory}
              counts={categoryCounts}
              onChange={setActiveCategory}
            />
          </div>
        </div>

        {/* Pinned Projects Section (Shown when no search query and category is All) */}
        {!searchQuery && activeCategory === "All" && pinnedProjects.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">📌</span>
                <h3 className="text-lg font-bold">Featured Projects</h3>
              </div>
              <span className="text-xs text-neutral-500 font-medium">{pinnedProjects.length} Pinned</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pinnedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Filtered Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
            <h3 className="text-lg font-bold">
              {activeCategory === "All" ? "All Projects" : `${activeCategory} Projects`}
            </h3>
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              Showing {filteredProjects.length} of {projects.length}
            </span>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && projects.length > 0 && (
            <div className="text-center py-16 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-6 space-y-3">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                No projects found matching your search query or filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-80"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
