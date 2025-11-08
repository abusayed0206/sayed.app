"use client";
import Header from "@/components/Header";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <section className="py-8 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-4">
            <a
              href="/projects"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Back to Projects
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              [UG Thesis] Vertical Extension of Civil Engineering Building
            </h1>
            <span className="px-3 py-1 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">
              Academic
            </span>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
            This project focuses on the vertical extension of the Civil
            Engineering Building at CUET, which is a 3 story building and built
            in 1968.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              structure
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              seismic-evaluation
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              BSPP
            </span>
          </div>

          <div className="flex justify-center gap-3">
            <a
              href="https://blog.abusayed.dev/vertical-extension-of-civil-engineering-building"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Read Article 
            </a>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Project Overview
            </h2>

            <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 mb-6">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                This undergraduate thesis project focuses on the vertical
                extension and seismic evaluation of the Civil Engineering
                Building at CUET, originally constructed in 1968 as a 3-story
                structure.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                The project involves comprehensive structural analysis, seismic
                assessment using BNBC standards, and design recommendations for
                safely extending the building vertically while ensuring
                earthquake resistance.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Key Highlights
            </h2>

            <div className="space-y-3 mb-6">
              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Seismic Evaluation
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Comprehensive seismic assessment of the existing 1968
                  structure
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Vertical Extension Design
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Structural design for adding additional floors to the historic
                  building
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  BSPP Compliance
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  The Project for Promotion of Building Safety for Disaster Risk
                  Reduction (BSPP){" "}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Project Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Building
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Civil Engineering Building, CUET
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Original Construction
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  1968 (3 Stories)
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Project Type
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  UG Thesis Project
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Focus Areas
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Seismic Evaluation & Vertical Extension
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs text-neutral-500 dark:text-neutral-500">
            © 2025 Abu Sayed
          </p>
        </div>
      </footer>
    </div>
  );
}
