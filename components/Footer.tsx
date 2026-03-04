import Image from "next/image";
import { FaGithub, FaMastodon, FaOrcid } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { SiLinkedin } from "react-icons/si";

export default function Footer() {
  const socialLinks = [
    { href: "https://github.com/abusayed0206", icon: <FaGithub className="w-4 h-4" />, label: "GitHub" },
    { href: "https://linkedin.com/in/abusayed0206", icon: <SiLinkedin className="w-4 h-4" />, label: "LinkedIn" },
    { href: "https://orcid.org/0009-0007-8994-5252", icon: <FaOrcid className="w-4 h-4" />, label: "ORCiD" },
    { href: "https://bsky.app/profile/lrs.bd", icon: <FaBluesky className="w-4 h-4" />, label: "Bluesky" },
    { href: "https://mastodon.social/@abusayed", icon: <FaMastodon className="w-4 h-4" />, label: "Mastodon" },
  ];

  return (
    <footer className="mt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] py-10">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 overflow-hidden rounded-full">
            <Image
              src="/imgs/sayed.webp"
              alt="Abu Sayed"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Name & title */}
          <div className="text-center">
            <h2 className="text-lg font-medium text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
              Sayed / সাঈদ
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] mt-0.5">
              Civil Engineer &amp; Developer
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-center max-w-md leading-relaxed">
            Building things I like and looking for civil engineering related jobs (GRA/GTA). Check out my{" "}
            <a href="https://sayed.page" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)]">
              resume/cv
            </a>{" "}
            or read my{" "}
            <a href="https://sayed.blog" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)]">
              blog
            </a>.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] hover:text-[var(--color-text)] dark:hover:text-[var(--color-text-dark)] transition-colors"
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] mt-2">
            &copy; {new Date().getFullYear()} Sayed
          </p>
        </div>
      </div>
    </footer>
  );
}
