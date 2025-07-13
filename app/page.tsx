"use client";
import { useEffect, useState, useMemo } from "react";
import { FaGithub, FaTelegramPlane, FaMastodon } from "react-icons/fa";
import { SiTrakt } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import ThemeController from "./components/ThemeController";

interface Project {
  id: number;
  academic: boolean;
  name: string;
  description: string;
  keywords: string[];
  image: string;
  sourceCode: string;
  livePreview: string;
}

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
      {/* Theme Toggle - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeController />
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Project Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="tabs tabs-lifted">
            <a
              className={`tab ${selectedFilter === "all" ? "tab-active" : ""}`}
              onClick={() => setSelectedFilter("all")}
            >
              All Projects
            </a>
            <a
              className={`tab ${
                selectedFilter === "academic" ? "tab-active" : ""
              }`}
              onClick={() => setSelectedFilter("academic")}
            >
              Academic
            </a>
            <a
              className={`tab ${
                selectedFilter === "non-academic" ? "tab-active" : ""
              }`}
              onClick={() => setSelectedFilter("non-academic")}
            >
              Professional
            </a>
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
              {project.image && (
                <figure className="rounded-t-2xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={240}
                    className="w-full h-60 object-cover"
                  />
                </figure>
              )}
              <div className="card-body p-6">
                <div className="flex flex-wrap gap-2 mb-4">
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

                <h3 className="card-title text-lg font-semibold text-base-content mb-3 leading-tight">
                  {project.name}
                </h3>

                <p className="text-base-content/80 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="card-actions justify-end gap-3 mt-auto">
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
                className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <button
                className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
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
            <p className="font-semibold text-lg">Abu Sayed</p>
            <p className="text-base-content/70 text-sm">Civil Engineer & Full Stack Developer</p>
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
              href="https://twitter.com/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="Twitter/X"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://trakt.tv/users/lrs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="Trakt.tv"
            >
              <SiTrakt className="w-5 h-5" />
            </a>
            <a
              href="https://letterboxd.com/abusayed"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="Letterboxd"
            >
              <Image
                src="https://a.ltrbxd.com/logos/letterboxd-decal-dots-pos-rgb.svg"
                alt="Letterboxd"
                width={20}
                height={20}
                className="w-5 h-5"
              />
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
            <a
              href="https://t.me/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="Telegram"
            >
              <FaTelegramPlane className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-base-content/50 text-xs">
            © 2024 Abu Sayed. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
}
