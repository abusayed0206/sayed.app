export type ProjectCategory = "Web" | "Windows" | "Android" | "Others";

export interface Project {
  id: number;
  pin: boolean;
  name: string;
  description: string;
  keywords: string[];
  slug: string;
  category: ProjectCategory;
  image?: string;
  gallery?: string[];
  sourceCode?: string;
  livePreview?: string;
}
