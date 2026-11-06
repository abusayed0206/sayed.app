import type { IconType } from "react-icons";
import { FaBluesky, FaGithub, FaLinkedin, FaMastodon, FaOrcid } from "react-icons/fa6";
import { LuActivity, LuArrowUpRight, LuGraduationCap, LuMail, LuPenLine, LuUserRound } from "react-icons/lu";
import { SiGooglescholar } from "react-icons/si";

type Row = { href: string; name: string; detail: string; Icon: IconType; tint: string };

const sites: Row[] = [
  { href: "https://sayed.dev", name: "sayed.dev", detail: "CV & research", Icon: LuGraduationCap, tint: "#0f6b4a" },
  { href: "https://sayed.page", name: "sayed.page", detail: "Intro card", Icon: LuUserRound, tint: "#2f5bd3" },
  { href: "https://sayed.blog", name: "sayed.blog", detail: "Writing", Icon: LuPenLine, tint: "#b8700c" },
  { href: "https://status.sayed.app", name: "Status", detail: "Uptime", Icon: LuActivity, tint: "#b9452f" },
];

const social: Row[] = [
  { href: "https://github.com/abusayed0206", name: "GitHub", detail: "abusayed0206", Icon: FaGithub, tint: "#24292f" },
  { href: "https://bsky.app/profile/sayed.page", name: "Bluesky", detail: "@sayed.page", Icon: FaBluesky, tint: "#1185fe" },
  { href: "https://mastodon.social/@abusayed", name: "Mastodon", detail: "@abusayed", Icon: FaMastodon, tint: "#6364ff" },
  { href: "https://linkedin.com/in/abusayed0206", name: "LinkedIn", detail: "abusayed0206", Icon: FaLinkedin, tint: "#0a66c2" },
  { href: "https://orcid.org/0009-0007-8994-5252", name: "ORCID", detail: "0009-0007-8994-5252", Icon: FaOrcid, tint: "#a6ce39" },
  { href: "https://scholar.google.com/citations?hl=en&user=Wg6EztsAAAAJ", name: "Google Scholar", detail: "Publications", Icon: SiGooglescholar, tint: "#4285f4" },
  { href: "mailto:hello@sayed.app", name: "Email", detail: "hello@sayed.app", Icon: LuMail, tint: "#e2483d" },
];

function Group({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div>
      <p className="px-3 pb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{title}</p>
      <ul>
        {rows.map(({ href, name, detail, Icon, tint }) => (
          <li key={href}>
            <a
              href={href}
              rel="me noopener"
              className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface transition-colors"
            >
              <span
                className="size-9 shrink-0 grid place-items-center rounded-lg text-white shadow-sm transition-transform group-hover:scale-105"
                style={{ background: tint }}
                aria-hidden
              >
                <Icon className="size-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-headings">{name}</span>
                <span className="block text-xs text-muted-foreground truncate">{detail}</span>
              </span>
              <LuArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-headings" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FindMe() {
  return (
    <nav aria-label="My sites and social profiles" className="rounded-2xl border border-border bg-card p-3 shadow-[0_24px_48px_-28px_rgb(0_0_0/0.35)] grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <Group title="My sites" rows={sites} />
      <Group title="Find me on" rows={social} />
    </nav>
  );
}
