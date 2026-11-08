"use client";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";

// Public Turnstile site key (widget "sayed.app link shortener"); the secret is TURNSTILE_SECRET_KEY on the server
const TURNSTILE_SITE_KEY = "0x4AAAAAAF4tcnxnVxce4XbM";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

interface Instance {
  domain: string;
  name: string;
  type: string;
}

export default function GenerateRedirectPage() {
  const [profileUrl, setProfileUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [instances, setInstances] = useState<Instance[]>([]);
  const [showProfileSuggestions, setShowProfileSuggestions] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState<string[]>([]);
  const [shortUrl, setShortUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [shortUrlCopied, setShortUrlCopied] = useState(false);
  const [handle, setHandle] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const widgetEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef("");

  // Show the CAPTCHA only while a link can be shortened
  useEffect(() => {
    if (!turnstileReady || !generatedLink || shortUrl || !widgetEl.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(widgetEl.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: "shorten",
      callback: (t: string) => setCaptchaToken(t),
      "expired-callback": () => setCaptchaToken(""),
      "error-callback": () => setCaptchaToken(""),
    });
    return () => {
      window.turnstile?.remove(widgetId.current);
      setCaptchaToken("");
    };
  }, [turnstileReady, generatedLink, shortUrl]);

  // Load instances on mount
  useEffect(() => {
    fetch("/data/instances.json")
      .then((res) => res.json())
      .then((data) => setInstances(data))
      .catch(() => setError("Failed to load instances"));
  }, []);

  // Filter profile suggestions
  useEffect(() => {
    if (profileUrl.trim() && instances.length > 0) {
      const cleanInput = profileUrl
        .replace(/^@/, "")
        .replace(/^https?:\/\//, "");
      const parts = cleanInput.split("@");

      if (parts.length < 2) {
        setShowProfileSuggestions(false);
        setFilteredProfiles([]);
        return;
      }

      const username = parts[0];
      const domainPartial = parts[1];

      if (!username) {
        setShowProfileSuggestions(false);
        setFilteredProfiles([]);
        return;
      }

      const filteredInsts = instances.filter((inst) =>
        inst.domain.toLowerCase().includes(domainPartial.toLowerCase())
      );

      if (filteredInsts.length === 0) {
        setShowProfileSuggestions(false);
        setFilteredProfiles([]);
        return;
      }

      const suggestions = filteredInsts.map(
        (inst) => `@${username}@${inst.domain}`
      );
      setFilteredProfiles(suggestions);
      setShowProfileSuggestions(true);
    } else {
      setShowProfileSuggestions(false);
      setFilteredProfiles([]);
    }
  }, [profileUrl, instances]);

  const handleGenerate = () => {
    setError("");
    setGeneratedLink("");
    setCopied(false);
    setShortUrl(""); // Reset short URL

    if (!profileUrl.trim()) {
      setError("Please enter a profile URL");
      return;
    }

    try {
      let cleanUrl = profileUrl
        .trim()
        .replace(/^https?:\/\//, "")
        .replace(/^@/, "");

      let profileHandle = "";

      if (cleanUrl.includes("@")) {
        // Format: user@domain.com
        profileHandle = cleanUrl.split("/")[0];
      } else if (cleanUrl.includes("/")) {
        // Format: domain.com/@user or domain.com/user
        const parts = cleanUrl.split("/");
        const domain = parts[0];
        const username = parts[parts.length - 1].replace(/^@/, "");
        profileHandle = `${username}@${domain}`;
      } else {
        setError(
          "Please include the instance domain. Format: @user@domain.com"
        );
        return;
      }

      if (!profileHandle.includes("@")) {
        setError(
          "Invalid profile format. Try: @user@domain.com or https://domain.com/@user"
        );
        return;
      }

      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const link = `${baseUrl}/redirect/@${profileHandle}`;
      setGeneratedLink(link);
      setHandle(profileHandle);
    } catch {
      setError("Failed to parse profile URL. Please check the format.");
    }
  };

  const handleShortenUrl = async () => {
    if (!handle || !captchaToken) return;

    setIsShortening(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle, token: captchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to shorten URL");
        return;
      }

      setShortUrl(data.shortUrl);
    } catch {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsShortening(false);
      // Tokens are single-use: get a fresh one for a retry
      setCaptchaToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  };

  const handleCopyShortUrl = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setShortUrlCopied(true);
      setTimeout(() => setShortUrlCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  const handleCopy = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  const handleProfileSelect = (profile: string) => {
    setProfileUrl(profile);
    setShowProfileSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleGenerate();
  };

  const handleProfileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && filteredProfiles.length > 0) {
      e.preventDefault();
      setProfileUrl(filteredProfiles[0]);
      setShowProfileSuggestions(false);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto px-4 pt-14 pb-12">
        <div className="text-center">
          <h1 className="font-serif text-5xl sm:text-6xl mb-3 text-headings tracking-tight">
            Generate Shareable Redirect Link
          </h1>

          <p className="text-sm text-foreground mb-8 max-w-xl mx-auto">
            Create a shareable link that lets anyone open a Fediverse profile on their own instance.
          </p>

          <div className="max-w-2xl mx-auto border border-border rounded-2xl bg-card p-6">
            <div className="space-y-4 text-left">
              {/* Profile Input */}
              <div className="relative">
                <label
                  htmlFor="profileUrl"
                  className="block text-sm font-medium text-headings mb-2"
                >
                  Profile URL or Handle
                </label>
                <input
                  type="text"
                  id="profileUrl"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  onKeyDown={(e) => {
                    handleKeyPress(e);
                    handleProfileKeyDown(e);
                  }}
                  onFocus={() => profileUrl && setShowProfileSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowProfileSuggestions(false), 200)
                  }
                  placeholder="@user@instance.com or user@instance.com"
                  autoComplete="off"
                  className="w-full px-4 py-2 text-sm border border-border rounded-md bg-background text-headings placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {showProfileSuggestions && filteredProfiles.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredProfiles.map((profile) => (
                      <button
                        key={profile}
                        type="button"
                        onClick={() => handleProfileSelect(profile)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-muted-foreground/20 text-headings"
                      >
                        {profile}
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter any Fediverse profile, then press Tab to autocomplete
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-100 rounded-md">
                  {error}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                className="w-full px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Generate Shareable Link
              </button>

              {/* Generated Link */}
              {generatedLink && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <label className="block text-sm font-medium text-headings">
                    Your Shareable Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className="flex-1 px-4 py-2 text-sm border border-border rounded-md bg-background text-headings font-mono"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted-foreground/20 transition-colors font-medium shrink-0"
                    >
                      {copied ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Share this link with anyone. They'll be able to open this profile on their own instance.
                  </p>

                  {/* Shorten Button - Now more prominent */}
                  {!shortUrl && (
                    <div className="pt-2 space-y-3">
                      <Script
                        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                        onReady={() => setTurnstileReady(true)}
                      />
                      <div ref={widgetEl} className="flex justify-center" />
                      <button
                        onClick={handleShortenUrl}
                        disabled={isShortening || !captchaToken}
                        className="w-full px-4 py-3 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isShortening ? (
                          <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Shortening...
                          </>
                        ) : (
                          <>
                            🔗 Shorten This Link
                          </>
                        )}
                      </button>
                      <p className="mt-2 text-xs text-center text-muted-foreground">
                        Get a shorter, easier-to-share link
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Short URL Display */}
              {shortUrl && (
                <div className="space-y-3 pt-4 border-t-2 border-green-200 dark:border-green-900">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <label className="block text-sm font-semibold text-green-900 dark:text-green-100">
                      ✨ Short Link Ready!
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="flex-1 px-4 py-2 text-sm border-2 border-green-200 dark:border-green-900 rounded-md bg-green-50 dark:bg-green-950/50 text-headings font-mono font-semibold"
                    />
                    <button
                      onClick={handleCopyShortUrl}
                      className="px-4 py-2 text-sm bg-green-600 text-white dark:bg-green-500 rounded-md hover:bg-green-700 dark:hover:bg-green-400 transition-colors font-semibold shrink-0"
                    >
                      {shortUrlCopied ? "✓ Copied!" : "Copy Short Link"}
                    </button>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                    🎉 Perfect! This compact link is much easier to share.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="max-w-2xl mx-auto mt-8 border border-border rounded-2xl bg-card p-6 text-left">
            <h2 className="text-lg font-semibold mb-4 text-headings">
              How It Works
            </h2>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-lg">📝</span>
                <div>
                  <strong className="text-headings">Enter Profile:</strong> Type any Fediverse profile handle like <code className="px-1 py-0.5 bg-muted-foreground/10 rounded">@user@mastodon.social</code> or <code className="px-1 py-0.5 bg-muted-foreground/10 rounded">user@mastodon.social</code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🔗</span>
                <div>
                  <strong className="text-headings">Generate Link:</strong> Click the button to create a shareable redirect link that works for everyone.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">✨</span>
                <div>
                  <strong className="text-headings">Shorten (Optional):</strong> Click "Shorten This Link" to get a compact <code className="px-1 py-0.5 bg-muted-foreground/10 rounded">sayed.app/s/...</code> URL that's perfect for social media.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📤</span>
                <div>
                  <strong className="text-headings">Share:</strong> Copy either the full or short link and share it anywhere. When people click it, they can choose their instance and follow/view the profile.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">⌨️</span>
                <div>
                  <strong className="text-headings">Autocomplete:</strong> Press <kbd className="px-2 py-0.5 bg-muted-foreground/10 rounded text-xs font-mono">Tab</kbd> while typing to autocomplete from popular instances.
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex gap-3 justify-center">
            <a
              href="/redirect"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md hover:bg-muted-foreground/20 transition-colors"
            >
              ← Use Redirect Tool
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md hover:bg-muted-foreground/20 transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
