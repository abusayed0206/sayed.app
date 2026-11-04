import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import ProjectCover from "@/components/ProjectCover";
import { categoryColor, categoryOf, getProject, projects, related } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const og = `/api/og/project?${new URLSearchParams({ title: p.name, tagline: p.tagline, category: categoryOf(p.category).title })}`;
  return {
    title: p.name,
    description: p.summary,
    keywords: p.tags,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.name, description: p.summary, url: `/projects/${p.slug}`, type: "article", images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: p.name, description: p.tagline, images: [og] },
  };
}

const isExternal = (url: string) => url.startsWith("http");

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const cat = categoryOf(p.category);
  const color = categoryColor(p.category);
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const [primary, ...secondary] = p.links;

  const facts = [
    { label: "Type", value: cat.title },
    { label: "Platform", value: p.platforms.join(", ") },
    p.stack?.length ? { label: "Built with", value: p.stack.join(", ") } : null,
    p.year ? { label: "Since", value: String(p.year) } : null,
    { label: "Status", value: p.status },
    ...(p.facts ?? []),
  ].filter(Boolean) as { label: string; value: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": p.category === "academic" ? "CreativeWork" : "SoftwareApplication",
    name: p.name,
    description: p.summary,
    url: `https://sayed.app/projects/${p.slug}`,
    author: { "@type": "Person", name: "Abu Sayed", url: "https://sayed.dev" },
    ...(p.category !== "academic" && { applicationCategory: cat.title, operatingSystem: p.platforms.join(", ") }),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-border bg-grid">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-12">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground flex flex-wrap gap-1.5">
            <Link href="/projects" className="hover:text-headings">Index</Link>
            <span aria-hidden>/</span>
            <Link href={`/projects?c=${p.category}`} className="hover:text-headings">{cat.title}</Link>
            <span aria-hidden>/</span>
            <span className="text-headings" aria-current="page">{p.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                <span className="px-2 py-1 rounded-full border" style={{ color, borderColor: color }}>{cat.short}</span>
                {p.platforms.filter((x) => x !== cat.short).map((x) => (
                  <span key={x} className="px-2 py-1 rounded-full border border-border text-muted-foreground">{x}</span>
                ))}
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden /> {p.status}
                </span>
              </p>
              <h1 className="mt-5 font-serif text-5xl sm:text-6xl lg:text-7xl text-headings leading-[0.95] tracking-tight text-balance">
                {p.name}
              </h1>
              <p className="mt-5 text-xl text-foreground leading-snug text-pretty max-w-xl">{p.tagline}</p>

              {primary && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={primary.url}
                    {...(isExternal(primary.url) && { target: "_blank", rel: "noopener noreferrer" })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-headings text-background font-medium hover:opacity-90 transition-opacity"
                  >
                    {primary.label} <span aria-hidden>↗</span>
                  </a>
                  {secondary.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      {...(isExternal(l.url) && { target: "_blank", rel: "noopener noreferrer" })}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-headings hover:border-muted-foreground transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <ProjectCover project={p} priority className="aspect-[16/10] rounded-2xl border border-border shadow-[0_24px_48px_-24px_rgb(0_0_0/0.35)]" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {p.metrics && (
            <dl className="mb-12 flex flex-wrap gap-px bg-border border border-border rounded-2xl overflow-hidden">
              {p.metrics.map((m) => (
                <div key={m.label} className="flex-1 min-w-36 bg-card p-5">
                  <dd className="font-serif text-5xl leading-none text-headings">{m.value}</dd>
                  <dt className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{m.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <section aria-labelledby="overview">
            <h2 id="overview" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Overview</h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-pretty max-w-[65ch]">
              {p.overview.map((para, k) => (
                <p key={k} className={k === 0 ? "text-headings text-xl" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </section>

          {p.features.length > 0 && (
            <section aria-labelledby="features" className="mt-14">
              <h2 id="features" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {p.category === "academic" ? "Highlights" : "What it does"}
              </h2>
              <ol className="mt-4 grid gap-px sm:grid-cols-2 bg-border border border-border rounded-2xl overflow-hidden">
                {p.features.map((f, k) => (
                  <li key={f.title} className="bg-card p-5">
                    <span className="font-mono text-xs" style={{ color }}>{String(k + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-serif text-2xl text-headings leading-tight">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed">{f.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 self-start space-y-6">
          <dl className="rounded-2xl border border-border bg-card divide-y divide-border">
            {facts.map((f) => (
              <div key={f.label} className="px-5 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                <dd className="mt-0.5 text-sm text-headings">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Links</p>
            <ul className="mt-2 space-y-1.5">
              {p.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} {...(isExternal(l.url) && { target: "_blank", rel: "noopener noreferrer" })} className="flex justify-between gap-2 text-sm text-headings hover:text-primary">
                    {l.label} <span aria-hidden className="text-muted-foreground">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="font-mono text-xs px-2 py-1 rounded-md bg-surface text-muted-foreground">#{t}</span>
            ))}
          </p>
        </aside>
      </div>

      {related(p).length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-labelledby="more">
          <h2 id="more" className="font-serif text-4xl text-headings">More {cat.title.toLowerCase()}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related(p).map((r) => (
              <li key={r.slug}><ProjectCard project={r} /></li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="Project navigation" className="mx-auto max-w-6xl px-4 sm:px-6 mt-14 grid grid-cols-2 gap-4">
        {[{ p: prev, dir: "← Previous" }, { p: next, dir: "Next →" }].map(({ p: x, dir }, k) => (
          <Link key={dir} href={`/projects/${x.slug}`} className={`rounded-2xl border border-border p-5 hover:bg-surface transition-colors ${k ? "text-right" : ""}`}>
            <span className="font-mono text-xs text-muted-foreground">{dir}</span>
            <span className="block mt-1 font-serif text-xl sm:text-2xl text-headings leading-tight">{x.name}</span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
