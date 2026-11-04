"use client";
import { useEffect } from "react";

export default function FeedPage() {
  useEffect(() => {
    // Ensure the web component is registered
    if (typeof window !== "undefined") {
      // @ts-ignore - bsky-embed is a web component without types
      import("bsky-embed/dist/bsky-embed.es.js");
    }
  }, []);

  return (
    <div>

      <div className="max-w-2xl mx-auto px-4 pt-14 pb-8">
        {/* Page Header - Centered */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-5xl sm:text-6xl mb-3 text-headings tracking-tight">
            Feed
          </h1>
          <p className="text-base sm:text-lg text-foreground mb-3">
            Updates from{" "}
            <a
              href="https://bsky.app/profile/sayed.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline decoration-2 underline-offset-2 hover:text-headings transition-colors"
            >
              @sayed.app
            </a>
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            This feed is from my automated bot account. Also available in ActivityPub (
            <a
              href="https://sayed.app/s/bskybot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline decoration-2 underline-offset-2 hover:text-headings transition-colors"
            >
              @sayed.app@bsky.brid.gy
            </a>
            )
          </p>
        </div>

        {/* Bluesky Feed Embed */}
        <div className="border border-border rounded-lg overflow-hidden">
          <bsky-embed
            username="sayed.app"
            limit="20"
            link-target="_blank"
            link-image="false"
            load-more="true"
          ></bsky-embed>
        </div>
      </div>
    </div>
  );
}
