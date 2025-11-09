import { FaGithub, FaMastodon, FaOrcid } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://abusayed.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              Resume/CV
            </a>
            <a
              href="https://sayed.blog"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              Blog
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 justify-center">
            <a
              href="https://github.com/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://orcid.org/0009-0007-8994-5252"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
              aria-label="ORCiD"
            >
              <FaOrcid className="w-5 h-5" />
            </a>
            <a
              href="https://bsky.app/profile/sayed.page"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
              aria-label="Bluesky"
            >
              <FaBluesky className="w-5 h-5" />
            </a>
            <a
              href="https://mastodon.social/@abusayed"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
              aria-label="Mastodon"
            >
              <FaMastodon className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            © 2025 Abu Sayed
          </p>
        </div>
      </div>
    </footer>
  );
}
