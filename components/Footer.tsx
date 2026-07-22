import Image from "next/image";
import { FaGithub, FaLinkedin, FaOrcid } from "react-icons/fa";
import { FaBluesky, FaMastodon } from "react-icons/fa6";

export default function Footer() {
  const socialLinks = [
    { href: "https://github.com/abusayed0206", icon: <FaGithub className="w-4 h-4" />, label: "GitHub" },
    { href: "https://linkedin.com/in/abusayed0206", icon: <FaLinkedin className="w-4 h-4" />, label: "LinkedIn" },
    { href: "https://orcid.org/0009-0007-8994-5252", icon: <FaOrcid className="w-4 h-4" />, label: "ORCiD" },
    { href: "https://bsky.app/profile/sayed.page", icon: <FaBluesky className="w-4 h-4" />, label: "Bluesky" },
    { href: "https://mastodon.social/@abusayed", icon: <FaMastodon className="w-4 h-4" />, label: "Mastodon" },
  ];

  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Avatar / DP */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-300 dark:border-neutral-700 shadow-xs">
            <Image
              src="/imgs/sayed.webp"
              alt="Abu Sayed"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              Abu Sayed / সাঈদ
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              M.Sc. Student @ TU Darmstadt • CUET Graduate
            </p>
          </div>

          {/* Quick Bio & Links */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
            Creating open-source software, Windows desktop apps, and web platforms. Check out my{" "}
            <a
              href="https://sayed.page"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Resume / CV
            </a>{" "}
            or read my{" "}
            <a
              href="https://sayed.blog"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Blog
            </a>.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-1.5 pt-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 rounded-lg"
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-2 text-xs text-neutral-400 dark:text-neutral-600 font-medium">
            &copy; {new Date().getFullYear()} sayed.app • All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
