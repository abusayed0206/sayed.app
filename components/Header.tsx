"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { elsewhere } from "@/lib/site";

const nav = [
  { href: "/projects", label: "Index" },
  { href: "/domains", label: "Domains" },
  { href: "/feed", label: "Feed" },
  { href: "/redirect", label: "Redirect" },
];

function ThemeToggle() {
  const toggle = () => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="size-9 grid place-items-center rounded-full text-headings hover:bg-surface transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="dark:hidden" aria-hidden>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="hidden dark:block" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const active = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm text-headings" onClick={() => setOpen(false)}>
          <span className="size-2 rounded-full bg-signal" aria-hidden />
          sayed.app
        </Link>

        <nav className="hidden sm:flex items-center gap-1 text-sm" aria-label="Main">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`px-3 py-1.5 rounded-full transition-colors ${active(l.href) ? "bg-surface text-headings" : "hover:text-headings"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div ref={ref} className="ml-auto flex items-center gap-1 relative">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="px-3 py-1.5 text-sm rounded-full hover:bg-surface hover:text-headings transition-colors"
          >
            <span className="sm:hidden">Menu</span>
            <span className="hidden sm:inline">Elsewhere ↗</span>
          </button>
          <ThemeToggle />
          {open && (
            <div id="site-menu" className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-card shadow-xl p-2">
              <ul className="sm:hidden border-b border-border pb-2 mb-2">
                {nav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-surface text-headings">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="px-3 pt-1 pb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">My other sites</p>
              <ul>
                {elsewhere.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="flex items-baseline justify-between gap-3 px-3 py-2 rounded-lg hover:bg-surface">
                      <span className="text-headings">{l.label}</span>
                      <span className="text-xs text-muted-foreground">{l.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
