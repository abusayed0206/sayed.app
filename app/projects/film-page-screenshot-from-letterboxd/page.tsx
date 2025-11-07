"use client";
import Header from "@/components/Header";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <section className="py-8 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-4">
            <a href="/projects" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Back to Projects
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Film Page Screenshot from Letterboxd
            </h1>
            <span className="px-3 py-1 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">Personal</span>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
            A poster style screenshot of a RSS film page from Letterboxd. Updated with the latest film data daily.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">film</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">letterboxd</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">rss</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">screenshot</span>
          </div>

          <div className="flex justify-center gap-3">
            <a href="https://github.com/abusayed0206/film-page-screenshot?tab=readme-ov-file" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
              View Code →
            </a>
            <a href="https://letterboxd.sayed.app/film.jpg" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
              Live Demo →
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
                This automation tool is designed to capture high-quality screenshots of film pages from Letterboxd, a popular social network for film enthusiasts. It's useful for archiving film information, creating collections, or sharing film details on social media.
              </p>
              
              <p className="text-neutral-600 dark:text-neutral-400">
                The tool automates the process of capturing consistent, professional-looking screenshots of film pages, saving time and effort for film researchers and enthusiasts.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Key Features</h2>
            
            <div className="space-y-3 mb-6">
              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Automated Screenshots</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Automatically capture film page screenshots from Letterboxd</p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Batch Processing</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Process multiple film pages in one go</p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Consistent Quality</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Ensures uniform screenshot quality and formatting</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Use Cases</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Purpose</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Film Archival & Sharing</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Platform</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Letterboxd</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Type</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Automation Tool</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Output</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Image Files</p>
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
