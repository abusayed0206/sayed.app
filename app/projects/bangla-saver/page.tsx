"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MicrosoftStoreBadge from "@/components/MicrosoftStoreBadge";

export default function ProjectPage() {
  const gallery = ["/imgs/bangla-saver.png","/imgs/bangla-saver-ss1.png","/imgs/bangla-saver-ss2.png"];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <Header />

      {/* Hero Header */}
      <section className="py-10 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-4">
            <a
              href="/projects"
              className="text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              ← Back to Projects
            </a>
          </div>

          <div className="flex flex-col items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full">
              Windows App
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              BanglaSaver
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Free screensaver manager for Windows 10 and 11.
            </p>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            BanglaSaver is a free, lightweight screensaver manager for Windows 10 and 11 that installs beautiful Bangla screensavers on your PC with a single click — under 3 MB and no admin rights needed.
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mb-8">
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#bangla</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#screensaver</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#windows</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#app</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#open-source</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#utility</span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MicrosoftStoreBadge href="https://apps.microsoft.com/detail/9p9fb1wn7pcv?hl=en-US&gl=BD" />
            <a
              href="https://github.com/abusayed0206/bsaver"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              View Source Code
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {/* Screenshot Showcase */}
          {gallery.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
                App Preview & Screenshots
              </h2>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-md">
                <img
                  src={gallery[activeImgIndex]}
                  alt="BanglaSaver screenshot"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>

              {gallery.length > 1 && (
                <div className="flex justify-center gap-3 pt-2">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-24 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all ${
                        activeImgIndex === idx
                          ? "border-neutral-900 dark:border-neutral-100 scale-105 shadow-sm"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Overview
            </h2>
            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-6 border border-neutral-200/80 dark:border-neutral-800/80 space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
              <p>BanglaSaver is a lightweight screensaver manager designed specifically for Windows 10 and 11. It lets you install and manage Bangla-themed screensavers with a single click, without requiring administrator privileges.</p>
              <p>The app weighs under 3 MB and provides a clean, hassle-free experience — preview screensavers before applying, and remove them cleanly when you are done.</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">One-Click Setup</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Install Bangla screensavers instantly with a single click.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Preview Before Applying</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">See how the screensaver looks before setting it as active.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">No Admin Rights Needed</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Runs without elevated permissions, safe, lightweight, and portable.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Clean Removal</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Easily revert to system default screensavers with zero leftover files.</p>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Application Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Platform</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Windows 10 & 11</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Publisher</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">abusayed.dev</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Distribution</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Microsoft Store</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Category</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Personalization</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Price / License</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Free / Open Source</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">App Size</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Under 3 MB</span>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-center space-y-4">
            <h3 className="text-xl font-bold">Get BanglaSaver from Microsoft Store</h3>
            <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-700 max-w-md mx-auto">
              Download and install directly on your Windows PC with safe, automatic updates from the Microsoft Store.
            </p>
            <div className="pt-2 flex justify-center">
              <MicrosoftStoreBadge href="https://apps.microsoft.com/detail/9p9fb1wn7pcv?hl=en-US&gl=BD" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
