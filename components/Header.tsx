"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeController from "@/app/components/ThemeController";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "Feed" },
    { href: "/personal-feed", label: "Personal" },
    { href: "/redirect", label: "Redirect" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-14 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Theme Controller */}
          <ThemeController />
        </div>
      </div>
    </header>
  );
}
