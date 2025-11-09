"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FeedPage() {
  useEffect(() => {
    // Ensure the web component is registered
    if (typeof window !== "undefined") {
      // @ts-ignore - bsky-embed is a web component without types
      import("bsky-embed/dist/bsky-embed.es.js");
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Page Header - Centered */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
            Feed
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mb-3">
            Updates from{" "}
            <a
              href="https://bsky.app/profile/sayed.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline decoration-2 underline-offset-2 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              @sayed.app
            </a>
          </p>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-500 leading-relaxed">
            This feed is from my automated bot account. Also available in ActivityPub (
            <a
              href="https://sayed.app/s/bskybot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline decoration-2 underline-offset-2 hover:text-neutral-700 dark:hover:text-neutral-400 transition-colors"
            >
              @sayed.app@bsky.brid.gy
            </a>
            )
          </p>
        </div>

        {/* Bluesky Feed Embed */}
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <bsky-embed
            username="sayed.app"
            limit="20"
            link-target="_blank"
            link-image="false"
            load-more="true"
          ></bsky-embed>
        </div>
      </div>

      <Footer />
    </div>
  );
}
