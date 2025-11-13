"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data: Project[] = await response.json();
        // Sort: pinned projects first, then by id
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

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      {/* Page Header */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-2xl font-bold mb-2 text-black dark:text-white">
            Projects
          </h1>
          <p className="text-black dark:text-white">
            All my projects in one place
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          {/* Projects List */}
          <ul className="space-y-0">
            {projects.map((project, index) => (
              <li
                key={project.id}
                className={`py-4 ${
                  index !== projects.length - 1
                    ? "border-b border-black dark:border-white"
                    : ""
                }`}
              >
                <article>
                  <header className="mb-2">
                    <h3 className="text-lg font-bold text-black dark:text-white">
                      <a
                        href={`/projects/${project.slug}`}
                        className="underline hover:no-underline"
                      >
                        {project.name}
                      </a>
                      {project.pin && (
                        <span className="ml-2 text-sm" aria-label="Pinned">
                          📌
                        </span>
                      )}
                    </h3>
                  </header>

                  <p className="text-black dark:text-white mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2">
                      {project.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="text-black dark:text-white"
                        >
                          #{keyword}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {(project.sourceCode || project.livePreview) && (
                      <>
                        <span className="text-black dark:text-white">•</span>
                        <div className="flex gap-2">
                          {project.sourceCode && (
                            <a
                              href={project.sourceCode}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black dark:text-white underline hover:no-underline"
                            >
                              [code]
                            </a>
                          )}
                          {project.livePreview && (
                            <a
                              href={project.livePreview}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black dark:text-white underline hover:no-underline"
                            >
                              [demo]
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-black dark:text-white">
                No projects found.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
