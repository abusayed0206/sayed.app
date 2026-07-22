"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <Header />

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
              Web
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Quran REST API
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Lightning-fast, highly available RESTful API for Quranic resources.
            </p>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            Statically generated RESTful API delivering Ayah-by-Ayah JSON data, high-quality audio MP3s, and text images across Bengali, English, and Arabic via Cloudflare Edge Network.
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mb-8">
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#quran</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#api</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#rest-api</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#cloudflare-edge</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#audio</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#islamic</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://quran.sayed.app/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Open Live Link
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-md">
            <img src="/imgs/quran-api.png" alt="Quran REST API" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Overview
            </h2>
            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-6 border border-neutral-200/80 dark:border-neutral-800/80 space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
              <p>Welcome to the Quran API, delivering Ayah-by-Ayah JSON data, high-quality audio, and text images. The API is statically generated and globally distributed via Cloudflare's Edge Network for maximum performance and reliability.</p>
              <p>Includes CORS support (`Access-Control-Allow-Origin: *`) for direct calls from browser frontend applications and aggressive edge caching (`max-age=31536000`) for zero-latency subsequent loads.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Multi-Language Endpoints</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Dedicated Base URLs for Bengali (`quranapibn`), English (`quranapien`), and Arabic (`quranapiar`).</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">High-Quality Audio & Images</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Direct URL references to high-quality MP3 audio and PNG text/translation images.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Cloudflare Edge Distribution</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Globally distributed for lightning-fast responses with 1-year browser immutability caching.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Full CORS Support</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Call endpoints directly from any client-side JavaScript or mobile application.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Project Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Type</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">RESTful API</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">CDN / Hosting</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Cloudflare Edge</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Languages</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Bengali, English, Arabic</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">License</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Free for All</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
