"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Project } from "@/types/project";
import { FaGithub, FaMastodon, FaOrcid } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { SiLinkedin } from "react-icons/si";

export default function Home() {
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
      {/* Header */}
      <Header />

      {/* Hero Section - Indie Style */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-black dark:border-white overflow-hidden">
                <Image
                  src="/imgs/sayed.webp"
                  alt="Abu Sayed"
                  width={64}
                  height={64}
                  className="rounded-full w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1 text-black dark:text-white">
                  Sayed / সাঈদ
                </h1>
                <p className="text-base text-black dark:text-white">
                  Civil Engineer & Developer
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4 text-black text-center dark:text-white">
              <p className="leading-relaxed">
                Building things I like and looking for civil engineering related
                jobs (GRA/GTA). Check out my{" "}
                <a
                  href="https://abusayed.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  resume/cv
                </a>{" "}
                or read my{" "}
                <a
                  href="https://sayed.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  blog
                </a>
                .
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
              <a
                href="https://github.com/abusayed0206"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline hover:no-underline"
              >
                GitHub
              </a>
              <span className="text-black dark:text-white">•</span>
              <a
                href="https://linkedin.com/in/abusayed0206"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline hover:no-underline"
              >
                LinkedIn
              </a>
              <span className="text-black dark:text-white">•</span>
              <a
                href="https://orcid.org/0009-0007-8994-5252"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline hover:no-underline"
              >
                ORCiD
              </a>
              <span className="text-black dark:text-white">•</span>
              <a
                href="https://bsky.app/profile/sayed.page"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline hover:no-underline"
              >
                Bluesky
              </a>
              <span className="text-black dark:text-white">•</span>
              <a
                href="https://mastodon.social/@abusayed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline hover:no-underline"
              >
                Mastodon
              </a>
            </div>
          </div>

          {/* Feeds Section */}
          <div className="border border-black dark:border-white p-4 text-center md:text-left">
            <h2 className="text-lg font-bold mb-2 text-black dark:text-white">
              Bluesky Feeds
            </h2>
            <ul className="space-y-1 text-black dark:text-white">
              <li>
                <a href="/feed" className="underline hover:no-underline">
                  Bot Feed (@sayed.app)
                </a>
              </li>
              <li>
                <a
                  href="/personal-feed"
                  className="underline hover:no-underline"
                >
                  Personal Feed (@sayed.page)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
            Projects
          </h2>

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
              <p className="text-black dark:text-white">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
