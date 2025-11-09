"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      {/* Project Header */}
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
              Engineering Classification of Soil | Sughandha R/A, Chittagong
            </h1>
            <span className="px-3 py-1 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">
              Academic
            </span>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
            As part of our geotechnical engineering course (CE 332), we had the
            opportunity to undertake a significant lab project under the
            guidance of CUET professors and the Civil Engineering Department.
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              geotech
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              civil-engineering
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              academic
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <a
              href="https://blog.abusayed.dev/engineering-classification-of-soil-sughandha-ra-chittagong"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Read Article 
            </a>
            <a
              href="https://public.sayed.page/webdav/articles/CE-332%20Project.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              View Report 
            </a>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Project Overview
            </h2>

            <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 mb-6">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                As part of our geotechnical engineering course (CE 332), we had
                the opportunity to undertake a significant lab project under the
                guidance of CUET professors and the Civil Engineering
                Department.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                This project focused on the engineering classification of soil
                samples collected from Sughandha Residential Area in Chittagong.
                Through comprehensive laboratory testing and analysis, we
                examined various soil properties and characteristics to
                determine their classification according to standard engineering
                criteria.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Key Highlights
            </h2>

            <div className="space-y-3 mb-6">
              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Laboratory Testing
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Comprehensive soil testing including grain size analysis,
                  Atterberg limits, and other geotechnical properties
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Classification System
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Applied USCS and AASHTO classification systems for accurate
                  soil categorization
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Field Application
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Real-world application of geotechnical engineering principles
                  in a residential area context
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Project Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Course
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  CE 332 - Geotechnical Engineering
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Location
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Sughandha R/A, Chittagong
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Institution
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  CUET - Chittagong University of Engineering & Technology
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Type
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Laboratory Project & Field Study
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
