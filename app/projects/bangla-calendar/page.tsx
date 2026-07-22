"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MicrosoftStoreBadge from "@/components/MicrosoftStoreBadge";

export default function ProjectPage() {
  const gallery = ["/imgs/bangla-calendar.png","/imgs/bangla-calendar-ss1.png","/imgs/bangla-calendar-ss2.png"];
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
              Bangla Calendar
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Lightweight desktop widget displaying Bangla date, Hijri date & festival times.
            </p>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            Lightweight desktop widget for Windows that displays the current Bangla date alongside Hijri dates, sunrise and sunset times, and Bangladeshi festival information.
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mb-8">
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#bangla</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#calendar</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#date</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#widget</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#windows</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#hijri</span>
            <span className="px-2.5 py-0.5 text-xs bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-md">#utility</span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MicrosoftStoreBadge href="https://apps.microsoft.com/detail/9pcmxnfhvb6f?hl=en-US&gl=BD" />
            
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
                  alt="Bangla Calendar screenshot"
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
              <p>Bangla Calendar is a lightweight Windows application that displays the current Bangla date directly on your desktop. It functions as a clean widget staying accessible whenever you need it.</p>
              <p>Supports Hijri date calculation, sunrise/sunset times for your location, and highlights important public holidays and cultural festivals in Bangladesh.</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Desktop Floating Widget</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Stays subtle and accessible on your Windows desktop.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Hijri & Solar Calendar</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Provides accurate Hijri conversion and solar calendar date details.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Sunrise & Sunset Times</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Daily solar information calculated for your region.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Festival & Holiday List</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">Highlights national holidays and cultural events of Bangladesh.</p>
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
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Utilities & Tools</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Price</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Free</span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-medium">Widget Type</span>
                <span className="block text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">Desktop Companion</span>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-center space-y-4">
            <h3 className="text-xl font-bold">Get Bangla Calendar from Microsoft Store</h3>
            <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-700 max-w-md mx-auto">
              Download and install directly on your Windows PC with safe, automatic updates from the Microsoft Store.
            </p>
            <div className="pt-2 flex justify-center">
              <MicrosoftStoreBadge href="https://apps.microsoft.com/detail/9pcmxnfhvb6f?hl=en-US&gl=BD" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
