"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
              Bangla Movies & Series TMDb Wrapper
            </h1>
            <span className="px-3 py-1 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">Personal</span>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
            A website to browse latest Bangla movies and series. It provides a user-friendly interface to search and access various Bangla movies and series.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">nextjs</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">typescript</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">react</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">api</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">movies</span>
          </div>

          <div className="flex justify-center gap-3">
            <a href="https://github.com/abusayed0206/banglamovies" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
              View Code 
            </a>
            <a href="https://movies.sayed.app/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
              Live Demo 
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
                A website to browse the latest Bangla movies and series, built with Next.js and TypeScript. This web application provides a user-friendly interface to search and access various Bangla movies and series using The Movie Database (TMDb) API.
              </p>
              
              <p className="text-neutral-600 dark:text-neutral-400">
                The platform makes it easy to discover and explore Bangla cinema with detailed information, ratings, and more.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Key Features</h2>
            
            <div className="space-y-3 mb-6">
              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Browse Bangla Content</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Discover latest Bangla movies and series with detailed information</p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Search Functionality</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Easy search and filtering to find your favorite content</p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">TMDb Integration</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Powered by The Movie Database API for accurate data</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Technical Stack</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Framework</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Next.js</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Language</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">TypeScript</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">API</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">TMDb API</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Type</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Web Application</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
