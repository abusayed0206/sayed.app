"use client";
import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Project } from "@/types/project";

type FilterType = "all" | "academic" | "non-academic";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    switch (selectedFilter) {
      case "academic":
        return projects.filter((project) => project.academic);
      case "non-academic":
        return projects.filter((project) => !project.academic);
      default:
        return projects;
    }
  }, [projects, selectedFilter]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      {/* Page Header */}
      <section className="py-8 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
            Projects
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Explore my academic research and personal projects
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedFilter === "all"
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
              onClick={() => setSelectedFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedFilter === "academic"
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
              onClick={() => setSelectedFilter("academic")}
            >
              Academic
            </button>
            <button
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedFilter === "non-academic"
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
              onClick={() => setSelectedFilter("non-academic")}
            >
              Others
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:shadow-sm"
              >
                <a
                  href={`/projects/${project.slug}`}
                  className="flex-1 flex flex-col cursor-pointer"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex-1 line-clamp-2">
                      {project.name}
                    </h3>
                    <span className="shrink-0 px-2 py-0.5 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">
                      {project.academic ? "Academic" : "Personal"}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                    {project.keywords.length > 3 && (
                      <span className="px-2 py-0.5 text-xs text-neutral-400 dark:text-neutral-600">
                        +{project.keywords.length - 3}
                      </span>
                    )}
                  </div>
                </a>

                <div className="flex justify-center gap-1.5 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                  {project.academic ? (
                    <>
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-xs"
                        >
                          Article
                        </a>
                      )}
                      {project.livePreview && (
                        <a
                          href={project.livePreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-xs"
                        >
                          Report
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-xs"
                        >
                          Code
                        </a>
                      )}
                      {project.livePreview && (
                        <a
                          href={project.livePreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-xs"
                        >
                          Demo
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-1">
              <button
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  currentPage === 1
                    ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                    : "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      currentPage === page
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  currentPage === totalPages
                    ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                    : "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

          {/* Empty State */}
          {currentProjects.length === 0 && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3 text-neutral-300 dark:text-neutral-700">
                📂
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                No projects found
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
