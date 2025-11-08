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
              Structural Design and Analysis of a Residential Building
            </h1>
            <span className="px-3 py-1 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">
              Academic
            </span>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
            According to the Bangladesh National Building Code (BNBC 2020), this project is for a 10-storied residential building situated on a 14,400 square-foot plot.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">structure</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">civil-engineering</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">academic</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">design</span>
          </div>

          <div className="flex justify-center gap-3">
            <a
              href="https://blog.abusayed.dev/structural-design-and-analysis-of-a-residential-building-at-pinkcity-raozan-chittagong-bangladesh"
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
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Project Overview</h2>
            
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 mb-6">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                According to the Bangladesh National Building Code (BNBC 2020), this project involves the comprehensive structural design and analysis of a 10-storied residential building situated on a 14,400 square-foot plot at Pinkcity, Raozan, Chittagong, Bangladesh.
              </p>
              
              <p className="text-neutral-600 dark:text-neutral-400">
                The project encompasses complete structural calculations, load analysis, and detailed design procedures following BNBC 2020 standards.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Key Highlights</h2>
            
            <div className="space-y-3 mb-6">
              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">BNBC 2020 Compliance</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Complete adherence to Bangladesh National Building Code 2020 standards
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Structural Analysis</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Comprehensive load analysis and structural design calculations
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">10-Story Design</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Multi-story residential building design with detailed floor plans
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Project Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Location</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Pinkcity, Raozan, Chittagong, Bangladesh</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Plot Size</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">14,400 square feet</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Building Type</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">10-Storied Residential Building</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Code Standard</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">BNBC 2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs text-neutral-500 dark:text-neutral-500">© 2025 Abu Sayed</p>
        </div>
      </footer>
    </div>
  );
}
