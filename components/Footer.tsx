import Link from "next/link";
import { elsewhere } from "@/lib/site";
import { categories } from "@/lib/projects";

const social = [
  { href: "https://github.com/abusayed0206", label: "GitHub" },
  { href: "https://bsky.app/profile/sayed.page", label: "Bluesky" },
  { href: "https://mastodon.social/@abusayed", label: "Mastodon" },
  { href: "https://linkedin.com/in/abusayed0206", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl text-headings leading-tight">
            Found a bug, or have an idea<br />for something to build?
          </p>
          <a href="mailto:hello@sayed.app" className="inline-block mt-4 font-mono text-sm text-primary link-underline">
            hello@sayed.app
          </a>
        </div>
        <FooterCol title="Projects" links={categories.map((c) => ({ href: `/projects?c=${c.id}`, label: c.title }))} internal />
        <FooterCol title="Elsewhere" links={elsewhere} />
        <FooterCol title="Social" links={social} />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 border-t border-border flex flex-wrap justify-between gap-2 font-mono text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} ABU SAYED · Darmstadt / Chattogram</span>
        <span>Built with Next.js · served via Cloudflare</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, internal }: { title: string; links: { href: string; label: string }[]; internal?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">{title}</p>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            {internal ? (
              <Link href={l.href} className="hover:text-headings transition-colors">{l.label}</Link>
            ) : (
              <a href={l.href} className="hover:text-headings transition-colors">{l.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
