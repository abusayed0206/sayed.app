import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FindMe from "@/components/FindMe";
import ProjectCard from "@/components/ProjectCard";
import { categories, categoryColor, projects } from "@/lib/projects";

// Title and description come from app/layout.tsx; only the canonical is page-specific
export const metadata: Metadata = { alternates: { canonical: "/" } };

const stats = [
  { value: String(projects.length), label: "projects" },
  { value: String(projects.filter((p) => p.category === "windows").length), label: "Windows apps" },
  { value: "6,000+", label: "Windows users" },
  { value: "0", label: "ads" },
];


const reviews = [
  { app: "BanglaSaver", slug: "banglasaver", quote: "It's exactly what I was looking for. Light, simple & FREE.", who: "Adnan, United States" },
  { app: "Bangla Quran Audio", slug: "bangla-quran-windows-app", quote: "I was looking for such an app for my PC. Your app is perfect.", who: "A user, by email" },
  { app: "Hadith Bangla", slug: "hadith-bangla", quote: "মাশাআল্লাহ আলহামদুলিল্লাহ জাজাকাল্লাহ খায়ের", who: "Nazmul, Bangladesh" },
];

const label = "font-mono text-xs uppercase tracking-wider text-muted-foreground";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const byYear = Object.entries(
    projects.reduce<Record<number, typeof projects>>((acc, p) => {
      if (p.year) (acc[p.year] ??= []).push(p);
      return acc;
    }, {}),
  ).sort(([a], [b]) => Number(b) - Number(a));

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-grid">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/imgs/sayed.webp" alt="Abu Sayed" width={56} height={56} className="size-14 rounded-full object-cover border-2 border-card shadow-md" priority />
              <div>
                <p className="text-headings font-medium">Abu Sayed <span className="text-muted-foreground font-normal">/ সাঈদ</span></p>
                <p className="text-sm text-muted-foreground">MSc student · TU Darmstadt, Germany</p>
              </div>
            </div>
            <h1 className="mt-8 font-serif text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.95] text-headings tracking-tight text-balance">
              I build small, ad-free software <em className="text-primary">for Bangla.</em>
            </h1>
            <ul className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
              {stats.map((s) => (
                <li key={s.label} className="px-3 py-1.5 rounded-full border border-border bg-card">
                  <span className="text-headings">{s.value}</span> <span className="text-muted-foreground">{s.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="px-5 py-2.5 rounded-full bg-headings text-background font-medium hover:opacity-90 transition-opacity">
                Browse projects →
              </Link>
              <Link href="/domains" className="px-5 py-2.5 rounded-full border border-border bg-card text-headings hover:border-muted-foreground transition-colors">
                My domains
              </Link>
            </div>
          </div>
          <FindMe />
        </div>
      </section>

      {/* Featured bento */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-20" aria-labelledby="featured">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className={label}>Selected work</p>
            <h2 id="featured" className="mt-2 font-serif text-4xl sm:text-5xl text-headings">Featured projects</h2>
          </div>
          <Link href="/projects" className="hidden sm:inline text-sm text-primary link-underline">All {projects.length} projects →</Link>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
          {featured.map((p, i) => (
            <li key={p.slug} className={i === 0 ? "md:col-span-2 lg:row-span-2" : ""}>
              <ProjectCard project={p} large={i === 0} priority={i < 3} />
            </li>
          ))}
        </ul>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-24" aria-labelledby="collections">
        <p className={label}>Collections</p>
        <h2 id="collections" className="mt-2 font-serif text-4xl sm:text-5xl text-headings">Four kinds of work</h2>
        <ul className="mt-8 grid gap-px bg-border border border-border rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const items = projects.filter((p) => p.category === c.id);
            return (
              <li key={c.id} className="bg-card">
                <Link href={`/projects?c=${c.id}`} className="group flex flex-col h-full p-6 hover:bg-surface transition-colors">
                  <span className="flex items-center justify-between">
                    <span className="size-3 rounded-full" style={{ background: categoryColor(c.id) }} aria-hidden />
                    <span className="font-serif text-5xl text-headings">{items.length}</span>
                  </span>
                  <span className="mt-6 font-serif text-2xl text-headings">{c.title}</span>
                  <span className="mt-1 text-sm">{c.blurb}</span>
                  <span className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground leading-relaxed">
                    {items.slice(0, 4).map((p) => p.name).join(" · ")}
                    {items.length > 4 && " …"}
                  </span>
                  <span className="mt-4 text-sm text-primary">Explore <span className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-24" aria-labelledby="timeline">
        <p className={label}>Timeline</p>
        <h2 id="timeline" className="mt-2 font-serif text-4xl sm:text-5xl text-headings">Year by year</h2>
        <ol className="mt-8 border-t border-border">
          {byYear.map(([year, items]) => (
            <li key={year} className="grid sm:grid-cols-[8rem_1fr] gap-3 py-6 border-b border-border">
              <span className="font-serif text-4xl text-headings">{year}</span>
              <ul className="flex flex-wrap gap-2 sm:pt-2">
                {items.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-sm text-headings hover:border-muted-foreground transition-colors">
                      <span className="size-1.5 rounded-full" style={{ background: categoryColor(p.category) }} aria-hidden />
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-24" aria-labelledby="reviews">
        <p className={label}>From users</p>
        <h2 id="reviews" className="mt-2 font-serif text-4xl sm:text-5xl text-headings">What people say</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.app}>
              <figure className="h-full flex flex-col rounded-2xl border border-border bg-card p-6">
                <span className="font-serif text-6xl leading-none text-primary" aria-hidden>“</span>
                <blockquote className="font-serif text-2xl text-headings leading-snug flex-1">{r.quote}</blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">
                  {r.who} · on{" "}
                  <Link href={`/projects/${r.slug}`} className="text-headings link-underline">{r.app}</Link>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

    </>
  );
}
