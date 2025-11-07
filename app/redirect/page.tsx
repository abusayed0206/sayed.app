"use client";
import Header from "@/components/Header";

export default function RedirectPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
            Redirect Service
          </h1>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 max-w-xl mx-auto">
            URL shortening and redirect management service. Coming soon.
          </p>

          {/* Status Badge */}
          <div className="inline-block mb-8">
            <span className="px-3 py-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded-md">
              Under Development
            </span>
          </div>

          {/* Features Card */}
          <div className="max-w-2xl mx-auto border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 text-left">
            <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              Planned Features
            </h2>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>Custom short URLs for easy sharing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>Link analytics and tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>QR code generation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>Custom redirect rules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>API access</span>
              </li>
            </ul>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Footer - Compact */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs text-neutral-500 dark:text-neutral-500">
            © 2025 Abu Sayed
          </p>
        </div>
      </footer>
    </div>
  );
}
