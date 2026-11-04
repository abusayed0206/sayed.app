import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const base = "https://sayed.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/domains", "/feed", "/personal-feed", "/redirect"].map((path) => ({
    url: base + path,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
