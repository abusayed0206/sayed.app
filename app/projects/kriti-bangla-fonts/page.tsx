"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
              Kriti Bangla Fonts
            </h1>
            <span className="px-3 py-1 text-xs bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded">
              Web
            </span>
          </div>

          <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6">
            WordPress plugin to add high-quality Bangla fonts with live preview,
            searchable catalog, and flexible delivery via Kriti CDN or locally
            hosted .woff2 files.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              wordpress
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              plugin
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              bangla
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              fonts
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              typography
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              cdn
            </span>
            <span className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded">
              woff2
            </span>
          </div>

          <div className="flex justify-center gap-3">
            <a
              href="https://github.com/abusayed0206/kriti-wp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              View Code
            </a>
            <a
              href="https://wordpress.org/plugins/kriti-bangla-fonts/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              WordPress Plugin
            </a>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 mb-8">
            <Image
              src="/imgs/kriti-font-plugin.png"
              alt="Kriti Bangla Fonts plugin banner"
              width={1568}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Project Overview
            </h2>

            <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 mb-6">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Kriti Bangla Fonts is an open-source WordPress plugin built to make
                Bangla typography simple and fast for WordPress websites. It provides
                a searchable Bangla font catalog and lets administrators preview fonts
                with custom text before applying them.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                Site owners can choose between Kriti CDN delivery for speed or local
                font hosting for greater control and privacy. The plugin supports
                global font assignment or targeted assignment to headings and
                paragraphs.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Key Features
            </h2>

            <div className="space-y-3 mb-6">
              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Searchable Font Catalog
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Browse and find Bangla fonts quickly from inside WordPress admin
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Live Preview
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Test fonts with your own text before saving and applying them
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Flexible Delivery
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Use Kriti CDN or host .woff2 files locally on your server
                </p>
              </div>

              <div className="border-l-4 border-neutral-900 dark:border-neutral-100 pl-4">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Targeted Assignments
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Apply fonts globally or specifically to H1-H6 and paragraph elements
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Plugin Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Platform
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  WordPress Plugin
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  WordPress Requirement
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  5.8+
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  PHP Requirement
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  7.4+
                </p>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Status
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Live & Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
