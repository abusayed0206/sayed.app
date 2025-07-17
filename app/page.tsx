"use client";
import { useEffect, useState, useMemo } from "react";
import { FaGithub, FaMastodon, FaOrcid } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { SiLinkedin } from "react-icons/si";

import Image from "next/image";
import ThemeController from "./components/ThemeController";
import ProjectImage from "@/components/ProjectImage";
import { Project } from "@/types/project";

type FilterType = "all" | "academic" | "non-academic";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;

  useEffect(() => {
    // Fetch project data from the JSON file
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

  // Filter projects based on selected filter
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Theme Toggle - Fixed Top Center */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <ThemeController />
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Project Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="tabs tabs-boxed bg-base-200 rounded-lg p-1">
            <button
              className={`tab tab-lg font-medium ${
                selectedFilter === "all"
                  ? "tab-active rounded-lg backdrop-blur-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-lg"
                  : "text-black dark:text-white"
              }`}
              onClick={() => setSelectedFilter("all")}
            >
              All Projects
            </button>
            <button
              className={`tab tab-lg font-medium ${
                selectedFilter === "academic"
                  ? "tab-active rounded-lg backdrop-blur-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-lg"
                  : "text-black dark:text-white"
              }`}
              onClick={() => setSelectedFilter("academic")}
            >
              Academic
            </button>
            <button
              className={`tab tab-lg font-medium ${
                selectedFilter === "non-academic"
                  ? "tab-active rounded-lg backdrop-blur-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 shadow-lg"
                  : "text-black dark:text-white"
              }`}
              onClick={() => setSelectedFilter("non-academic")}
            >
              Others
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="card bg-base-100 shadow-lg border border-base-200"
            >
              {/* Project Image */}
              {(project.image || true) && (
                <figure className="rounded-t-2xl overflow-hidden">
                  <ProjectImage
                    project={project}
                    alt={project.name}
                    width={400}
                    height={240}
                    className="w-full h-60 object-cover"
                  />
                </figure>
              )}
              <div className="card-body p-6 text-center">
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {project.keywords.slice(0, 3).map((keyword, index) => (
                    <div key={index} className="badge badge-neutral badge-sm">
                      {keyword}
                    </div>
                  ))}
                  {project.keywords.length > 3 && (
                    <div className="badge badge-ghost badge-sm">
                      +{project.keywords.length - 3}
                    </div>
                  )}
                </div>

                <h3 className="card-title text-lg font-semibold text-base-content mb-3 leading-tight justify-center">
                  {project.name}
                </h3>

                <p className="text-base-content/80 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="card-actions justify-center gap-3 mt-auto">
                  {project.academic ? (
                    <>
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-neutral"
                        >
                          Read Article
                        </a>
                      )}
                      {project.livePreview && (
                        <a
                          href={project.livePreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline"
                        >
                          View Report
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
                          className="btn btn-sm btn-outline"
                        >
                          Source Code
                        </a>
                      )}
                      {project.livePreview && (
                        <a
                          href={project.livePreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-neutral"
                        >
                          Live Demo
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join">
              <button
                className={`join-item btn ${
                  currentPage === 1 ? "btn-disabled" : ""
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
                    className={`join-item btn ${
                      currentPage === page ? "btn-active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className={`join-item btn ${
                  currentPage === totalPages ? "btn-disabled" : ""
                }`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentProjects.length === 0 && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 text-base-content/20">📂</div>
            <p className="text-xl text-base-content/60 mb-2">
              No projects found
            </p>
            <p className="text-base-content/40">
              Try selecting a different filter.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content border-t border-base-300">
        <aside className="grid place-items-center">
          {/* Profile Photo */}
          <div className="avatar mb-4">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src="/imgs/sayed.webp"
                alt="Abu Sayed"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-4">
            <p className="font-semibold text-lg">Sayed/সাঈদ</p>
            <p className="text-base-content/70 text-sm">
              Civil Engineer & build what I want build!
            </p>
            <div className="flex justify-center items-center gap-2 text-base-content text-xs mt-2 ">
              <button className="btn btn-sm btn-outline">
                <a href="https://sayed.page" target="_blank" rel="noopener noreferrer">Intro</a>
              </button>
              <button className="btn btn-sm btn-outline">
                <a href="https://abusayed.dev" target="_blank" rel="noopener noreferrer">Resume</a>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-4">
            <a
              href="https://github.com/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://orcid.org/0009-0007-8994-5252"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="ORCiD"
            >
              <FaOrcid className="w-5 h-5" />
            </a>
            <a
              href="https://bsky.app/profile/sayed.page"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="Bluesky"
            >
              <FaBluesky className="w-5 h-5" />
            </a>

            <a
              href="https://mastodon.social/@abusayed"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="Mastodon"
            >
              <FaMastodon className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-base-content/50 text-xs">
            © 2025 Abu Sayed. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
}
