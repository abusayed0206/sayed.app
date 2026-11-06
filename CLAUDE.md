# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`sayed.app` is the **project hub** for Abu Sayed: one catalog page per app, tool, library, or research project. It uses Next.js 16 App Router, React 19, Tailwind CSS v4, and TypeScript, and is hosted on Vercel behind Cloudflare DNS. It is one of three personal sites, each with its own look and its own job. Do not copy styles between them:

- **sayed.dev** (`D:\abusayed0206.github.io`): CV, research, and publications. It is the source of truth for academic facts.
- **sayed.page** (repo `D:\abusayed.dev`): one-page intro card; abusayed.dev redirects to it.
- **sayed.app** (this repo): every project, with details.

The GitHub profile README (`abusayed0206/abusayed0206`) also lists the projects. Keep project names and descriptions consistent with it.

## Commands

```bash
npm install      # bun.lock exists, but Bun doesn't run on this machine
npm run dev      # http://localhost:3000
npx next build   # production build; also the only type check. If it fails on .next/dev/types, delete .next
npm run lint     # the older feed/redirect pages still have ~30 pre-existing errors
```

There are no tests.

## Architecture

**`public/data/projects.json` is the single source of project content** (schema: `types/project.ts`). It is also served publicly at `/data/projects.json`.

- `app/projects/[slug]/page.tsx` statically generates a detail page for every entry. It also builds per-page metadata, an OG image, JSON-LD, related projects, and prev/next links. `dynamicParams = false`, so a slug that isn't in the JSON returns 404.
- `slug` is the public URL. Several slugs are kept long for backwards compatibility with older links, so don't rename them.
- File order decides list order, the "Featured" bento on the home page (`featured: true`, and the first one is shown large), and prev/next.
- `category` (`windows | web | other | academic`) controls grouping and colour. Category metadata lives in `lib/projects.ts`.
- Optional fields (`image`, `stack`, `year`, `metrics`, `facts`) simply don't render when they are absent. Without `image`, `components/ProjectCover.tsx` draws a generated typographic cover in the category colour.
- Only add facts you have verified (Store listing, live site, repo). Don't invent user counts or stack details.
- Copy style: no em dashes (—) anywhere in site text; use commas, colons or full stops. The Microsoft Store user count is "6,000+" (in `app/page.tsx` and `app/layout.tsx`).

**Pages:** `/` is a short hero next to the sites & socials list (`components/FindMe.tsx`), then the featured bento, collections, timeline (from `year`), and reviews. `/projects` is the searchable, filterable index (`components/ProjectIndex.tsx`, a client component). It has list and grid views, and `?c=<category>` is synced to the URL.

**Design system** (`app/globals.css`): a paper-and-ink palette defined as CSS variables on `:root`, with `.dark` overriding them. These are exposed as semantic Tailwind colours: `background`, `surface`, `card`, `headings`, `foreground`, `muted-foreground`, `border`, `primary`, `signal`, plus `--cat-*` for the categories. Use those instead of raw palette colours or `dark:` pairs. Fonts are loaded in `app/layout.tsx`: Instrument Serif for display (`font-serif`), Geist for UI, Geist Mono for metadata (`font-mono`), and Hind Siliguri as the fallback for Bengali glyphs. An inline `<head>` script applies `localStorage.theme` before paint.

**Layout:** `app/layout.tsx` renders the sticky `Header` and the `Footer`, so pages must not render them. Shared links to the other sites live in `lib/site.ts`. Client pages can't export `metadata`, so `feed`, `personal-feed`, and `redirect` each re-export theirs from `metadata.ts` through a pass-through `layout.tsx`.

**`/domains`** (`lib/domains.ts`) shows every domain I own or manage, with live registry data. It mirrors `scripts/whoisinfo.py` in `abusayed0206/actions`, which is where the domain list comes from. Keep the two in sync. Renewal prices are deliberately not shown.
- gTLDs use public RDAP (`rdap.org`).
- `.bd` uses `api.sayed.app/whoisbd`. Its registrant name and email are deliberately not shown.
- `.de` gets status from DENIC RDAP and dates from the Spaceship API (`SPACESHIP_API_KEY` / `SPACESHIP_API_SECRET`, same names as the actions repo; set them on Vercel too). Without the keys it falls back to the hardcoded `fixedExpiry`.
- Registry fetches are cached for 6 h and the HTTPS uptime pings for 10 min, so the page regenerates every 10 min.

**Other routes:**
- `/feed`, `/personal-feed`: Bluesky feeds via the `bsky-embed` web component, dynamically imported on the client.
- `/redirect*`: Fediverse profile redirector. The instance list is in `public/data/instances.json`.
- `/api/shorten`: proxy to a Sink link shortener. It needs `SINK_API_URL` and `SINK_API_TOKEN`. `/s/[slug]` redirects to `link.sayed.app`.
- `/api/og/project?title=&tagline=&category=`: OG images in the site palette.
- `public/storeapps/`: downloadable installers, linked from `projects.json`.
