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
              BanglaSaver
            </h1>
            <span className="px-3 py-1 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">Windows</span>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
            Free screensaver manager for Windows 10 and 11. One-click Bangla screensaver setup, preview before applying, clean removal — under 3 MB, no admin rights needed.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">bangla</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">screensaver</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">windows</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">app</span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">open-source</span>
          </div>

          <div className="flex justify-center gap-3">
            <a href="https://github.com/abusayed0206/bsaver" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
              View Code
            </a>
            <a href="https://apps.microsoft.com/detail/9p9fb1wn7pcv?hl=en-US&gl=US" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
              Microsoft Store
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
                BanglaSaver is a lightweight screensaver manager designed specifically for Windows 10 and 11. It lets you install and manage Bangla-themed screensavers with a single click, without requiring administrator privileges.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                The app weighs under 3 MB and provides a clean, hassle-free experience — preview screensavers before applying, and remove them cleanly when you&apos;re done.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Key Features</h2>

            <div className="space-y-3 mb-6">
              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">One-Click Setup</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Install Bangla screensavers instantly with a single click</p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Preview Before Applying</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">See how the screensaver looks before setting it as active</p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">No Admin Rights Needed</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Runs without elevated permissions, safe and portable</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Application Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Platform</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Windows 10 & 11</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Size</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Under 3 MB</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Distribution</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Microsoft Store</p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Status</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Live & Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
