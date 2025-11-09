"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Project } from "@/types/project";
import { FaGithub, FaMastodon, FaOrcid } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { SiLinkedin } from "react-icons/si";

type FilterType = "all" | "academic" | "non-academic";

export default function Home() {
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
      {/* Header */}
      <Header />

      {/* Hero Section - 3 Columns */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Profile */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src="/imgs/sayed.webp"
                  alt="Abu Sayed"
                  width={96}
                  height={96}
                  className="rounded-full w-full h-full object-cover"
                  priority
                />
              </div>

              <h1 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                Sayed / সাঈদ
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Civil Engineer & Developer
              </p>

              {/* Links - Compact */}
              <div className="flex flex-wrap gap-2 justify-center text-xs mb-3">
                <a
                  href="https://sayed.page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  About
                </a>
                <a
                  href="https://abusayed.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  Resume/CV
                </a>
                <a
                  href="https://sayed.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  Blog
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 justify-center">
                <a
                  href="https://github.com/abusayed0206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/abusayed0206"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://orcid.org/0009-0007-8994-5252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  aria-label="ORCiD"
                >
                  <FaOrcid className="w-4 h-4" />
                </a>
                <a
                  href="https://bsky.app/profile/sayed.page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  aria-label="Bluesky"
                >
                  <FaBluesky className="w-4 h-4" />
                </a>
                <a
                  href="https://mastodon.social/@abusayed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  aria-label="Mastodon"
                >
                  <FaMastodon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Feed (sayed.app) */}
            <div className="flex flex-col items-center text-center border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
              <div className="mb-4">
                <FaBluesky className="w-12 h-12 text-[#0085ff]" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                Feed
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Here you can visit the feed of my bsky bot
              </p>
              <a
                href="/feed"
                className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Feed(@sayed.app)
              </a>
            </div>

            {/* Column 3: Personal Feed */}
            <div className="flex flex-col items-center text-center border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
              <div className="mb-4">
                <FaBluesky className="w-12 h-12 text-[#0085ff]" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                Personal Feed
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Visit my Personal feed(@sayed.page)
              </p>
              <a
                href="/personal-feed"
                className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Personal Feed(@sayed.page)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
              Projects
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Explore my academic research and personal projects
            </p>
          </div>
          {/* Filter Tabs - Compact */}
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

          {/* Projects Grid - 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:shadow-sm"
              >
                {/* Clickable Project Card */}
                <a
                  href={`/projects/${project.slug}`}
                  className="flex-1 flex flex-col cursor-pointer"
                >
                  {/* Title and Type */}
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex-1 line-clamp-2">
                      {project.name}
                    </h3>
                    <span className="shrink-0 px-2 py-0.5 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">
                      {project.academic ? "Academic" : "Personal"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Keywords */}
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

                {/* Action Buttons - Centered Below */}
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

          {/* Pagination - Compact */}
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
