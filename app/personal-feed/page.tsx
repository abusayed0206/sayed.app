"use client";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function PersonalFeedPage() {
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
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
            Personal Feed
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Updates from{" "}
            <a
              href="https://bsky.app/profile/sayed.page"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              @sayed.page
            </a>
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            This is my social media feed. Available in web (
            <a
              href="https://feed.sayed.page"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-700 dark:hover:text-neutral-400"
            >
              feed.sayed.page
            </a>
            ), ActivityPub (
            <a
              href="https://mastodon.social/@abusayed"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-700 dark:hover:text-neutral-400"
            >
              @abusayed@mastodon.social
            </a>
            ) and ATProto/Bsky (
            <a
              href="https://bsky.app/profile/sayed.page"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-700 dark:hover:text-neutral-400"
            >
              @sayed.page
            </a>
            )
          </p>
        </div>

        {/* Bluesky Feed Embed */}
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <bsky-embed
            username="sayed.page"
            limit="20"
            link-target="_blank"
            link-image="false"
            load-more="true"
          ></bsky-embed>
        </div>
      </div>

      {/* Footer - Compact */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs text-neutral-500 dark:text-neutral-500">
            © 2025 Abu Sayed
          </p>
        </div>
      </footer>
    </div>
  );
}
