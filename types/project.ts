export type ProjectCategory = "web" | "windows" | "other" | "academic";

export interface Project {
  /** URL of the detail page: /projects/<slug>. Changing it breaks existing links. */
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  category: ProjectCategory;
  featured?: boolean;
  image?: string;
  platforms: string[];
  stack?: string[];
  year?: number;
  status: string;
  metrics?: { value: string; label: string }[];
  facts?: { label: string; value: string }[];
  overview: string[];
  features: { title: string; text: string }[];
  tags: string[];
  links: { label: string; url: string }[];
}
