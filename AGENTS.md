# AGENTS.md — Developer & AI Agent Guidelines

This repository (`sayed.app`) is a personal portfolio and project showcase web application built with **Next.js (App Router)**, **Tailwind CSS v4**, **TypeScript**, and **React 19** for **Abu Sayed** (Civil Engineer, CUET Graduate & M.Sc. Student @ TU Darmstadt).

---

## 1. Project Architecture Overview

- **Dataset**: All projects are declared in [`public/data/projects.json`](file:///d:/Github/sayed.app/public/data/projects.json).
- **TypeScript Types**: Shared project types defined in [`types/project.ts`](file:///d:/Github/sayed.app/types/project.ts).
- **Project Detail Pages**: Individual project pages reside in [`app/projects/[slug]/page.tsx`](file:///d:/Github/sayed.app/app/projects/).
- **Shared Components**:
  - `Header`: [`components/Header.tsx`](file:///d:/Github/sayed.app/components/Header.tsx)
  - `Footer`: [`components/Footer.tsx`](file:///d:/Github/sayed.app/components/Footer.tsx)
  - `ProjectCard`: [`components/ProjectCard.tsx`](file:///d:/Github/sayed.app/components/ProjectCard.tsx)
  - `CategoryFilter`: [`components/CategoryFilter.tsx`](file:///d:/Github/sayed.app/components/CategoryFilter.tsx)
  - `MicrosoftStoreBadge`: [`components/MicrosoftStoreBadge.tsx`](file:///d:/Github/sayed.app/components/MicrosoftStoreBadge.tsx)
- **Sitemap**: Automatically generated from `projects.json` via [`app/sitemap.ts`](file:///d:/Github/sayed.app/app/sitemap.ts).

---

## 2. Design Principles & Guidelines

1. **Modern Minimalist Aesthetics**:
   - Dark/Light mode support configured via CSS custom properties in [`app/globals.css`](file:///d:/Github/sayed.app/app/globals.css).
   - Clean typography with proper contrast, crisp geometric borders, and static hover states (no animations).

2. **Bengali Typography Standard**:
   - The primary Bengali font used across the site is **BCC Purno Black**, imported at the top of `globals.css`:
     ```css
     @import url('https://kriti.app/cdn/6570d38b.css');
     @theme {
       --font-sans: 'BCC Purno Black', sans-serif;
     }
     ```

3. **Software Product Separation**:
   - **DO NOT** combine distinct software products or distribution formats into a single project listing.
   - For instance, if a project has a **Web App**, **Windows App**, **WordPress Plugin**, or **Firefox Extension**, each distinct software product must have its own standalone entry in `projects.json` and its own detail page in `app/projects/[slug]`.

4. **Microsoft Store App Badges**:
   - For all Windows applications distributed on the Microsoft Store, use the official responsive badge component:
     ```tsx
     import MicrosoftStoreBadge from "@/components/MicrosoftStoreBadge";

     <MicrosoftStoreBadge href="https://apps.microsoft.com/detail/<PRODUCT_ID>?hl=en-US&gl=BD" />
     ```

---

## 3. How to Add a New Project

When adding a new project to the site, follow this step-by-step workflow:

### Step 1: Add Project Metadata in `public/data/projects.json`

Append a new JSON entry to `public/data/projects.json`:

```json
{
  "id": 28,
  "pin": false,
  "name": "My New Project",
  "description": "Short 1-2 sentence description of the project.",
  "keywords": ["tag1", "tag2", "tag3"],
  "slug": "my-new-project",
  "category": "Web",
  "image": "/imgs/my-new-project.png",
  "gallery": ["/imgs/my-new-project.png"],
  "sourceCode": "https://github.com/username/repo",
  "livePreview": "https://example.com"
}
```

*Note on `category`*: Allowed categories are `"Web"`, `"Windows"`, `"Android"`, or `"Others"`.

### Step 2: Create the Project Detail Page

Create a new directory and `page.tsx` file at `app/projects/[slug]/page.tsx`:

```tsx
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <Header />
      {/* Hero, Overview, Features, Specs */}
      <Footer />
    </div>
  );
}
```

---

## 4. How to Generate Project Photos/Images (If Missing)

The project includes an automatic image generation script ([`scripts/generate-project-images.mjs`](file:///d:/Github/sayed.app/scripts/generate-project-images.mjs)).

If a project is missing a local image file in `public/imgs/`, run:

```bash
bun run generate-images
# or
npm run generate-images
```

### How the Script Works
1. Reads all project items from `public/data/projects.json`.
2. Checks whether each project's specified `image` exists in `public/imgs/`.
3. If an image is missing or empty, it generates a custom vector SVG banner styled according to the project's category theme colors and saves it to `public/imgs/<slug>.svg`.
4. Updates `public/data/projects.json` to point to `/imgs/<slug>.svg`.

---

## 5. Verification & Build Commands

Before committing changes, verify site compilation and static generation:

```bash
# Run Development Server
bun run dev

# Run Production Build Check
bun run build
```
