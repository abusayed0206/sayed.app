"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PersonalFeedPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore - bsky-embed is a web component
      import("bsky-embed/dist/bsky-embed.es.js");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-medium mb-3 text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Personal Feed
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-2">
            Updates from{" "}
            <a
              href="https://bsky.app/profile/lrs.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)]"
            >
              @lrs.bd
            </a>
          </p>
          <p className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] leading-relaxed max-w-2xl mx-auto">
            This is my social media feed. Available on the web (
            <a href="https://feed.lrs.bd" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)]">feed.lrs.bd</a>
            ), ActivityPub (
            <a href="https://sayed.app/s/mstdn" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)]">@abusayed@mastodon.social</a>
            ) and ATProto/Bsky (
            <a href="https://bsky.app/profile/lrs.bd" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)]">@lrs.bd</a>
            )
          </p>
        </div>

        {/* Bluesky Feed Embed */}
        <div className=" border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] overflow-hidden">
          <bsky-embed
            username="lrs.bd"
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
