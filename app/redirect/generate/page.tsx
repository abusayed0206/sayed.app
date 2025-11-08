"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

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
        inst.domain.toLowerCase().startsWith(domainPartial.toLowerCase())
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
    } catch {
      setError("Failed to parse profile URL. Please check the format.");
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
            Generate Shareable Redirect Link
          </h1>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
            Create a shareable link that lets anyone open a Fediverse profile on their own instance.
          </p>

          <div className="max-w-2xl mx-auto border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
            <div className="space-y-4 text-left">
              {/* Profile Input */}
              <div className="relative">
                <label
                  htmlFor="profileUrl"
                  className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2"
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
                  className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />

                {showProfileSuggestions && filteredProfiles.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredProfiles.map((profile) => (
                      <button
                        key={profile}
                        type="button"
                        onClick={() => handleProfileSelect(profile)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                      >
                        {profile}
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                  Enter any Fediverse profile — press Tab to autocomplete
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
                className="w-full px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium"
              >
                Generate Shareable Link
              </button>

              {/* Generated Link */}
              {generatedLink && (
                <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Your Shareable Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className="flex-1 px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md bg-neutral-50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 font-mono"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium shrink-0"
                    >
                      {copied ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    Share this link with anyone. They'll be able to open this profile on their own instance.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="max-w-2xl mx-auto mt-8 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 text-left">
            <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              How It Works
            </h2>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="text-lg">📝</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Enter Profile:</strong> Type any Fediverse profile handle like <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">@user@mastodon.social</code> or <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">user@mastodon.social</code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🔗</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Generate Link:</strong> Click the button to create a shareable redirect link that works for everyone.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📤</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Share:</strong> Copy the link and share it on social media, in posts, or anywhere. When people click it, they can choose their instance and follow/view the profile.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">⌨️</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Autocomplete:</strong> Press <kbd className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs font-mono">Tab</kbd> while typing to autocomplete from popular instances.
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex gap-3 justify-center">
            <a
              href="/redirect"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              ← Use Redirect Tool
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </div>

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
