import { FaGithub, FaMastodon, FaOrcid } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { SiLinkedin } from "react-icons/si";

export default function Footer() {
  const links = [
    { href: "https://abusayed.dev", label: "Resume" },
    { href: "https://sayed.blog", label: "Blog" },
    { href: "https://github.com/abusayed0206", label: "GitHub", icon: <FaGithub className="w-3.5 h-3.5" /> },
    { href: "https://linkedin.com/in/abusayed0206", label: "LinkedIn", icon: <SiLinkedin className="w-3.5 h-3.5" /> },
    { href: "https://orcid.org/0009-0007-8994-5252", label: "ORCiD", icon: <FaOrcid className="w-3.5 h-3.5" /> },
    { href: "https://bsky.app/profile/lrs.bd", label: "Bluesky", icon: <FaBluesky className="w-3.5 h-3.5" /> },
    { href: "https://mastodon.social/@abusayed", label: "Mastodon", icon: <FaMastodon className="w-3.5 h-3.5" /> },
  ];

  return (
    <footer className="mt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] py-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)] transition-colors"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
            &copy; {new Date().getFullYear()} Sayed
          </p>
        </div>
      </div>
    </footer>
  );
}
