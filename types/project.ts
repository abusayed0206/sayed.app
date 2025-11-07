export interface Project {
  id: number;
  academic: boolean;
  name: string;
  description: string;
  keywords: string[];
  slug: string;
  image: string;
  sourceCode: string;
  livePreview: string;
}
