export default function Footer() {
  return (
    <footer className=" py-8 mt-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col gap-4 text-sm text-center md:text-left">
          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-black dark:text-white">
            <a
              href="https://abusayed.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Resume/CV
            </a>
            <span>•</span>
            <a
              href="https://sayed.blog"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Blog
            </a>
            <span>•</span>
            <a
              href="https://github.com/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/abusayed0206"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href="https://orcid.org/0009-0007-8994-5252"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              ORCiD
            </a>
            <span>•</span>
            <a
              href="https://bsky.app/profile/sayed.page"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Bluesky
            </a>
            <span>•</span>
            <a
              href="https://mastodon.social/@abusayed"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Mastodon
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
