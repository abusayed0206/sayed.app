"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Instance {
  domain: string;
  name: string;
  type: string;
}

export default function RedirectPage() {
  const [instance, setInstance] = useState("mastodon.social");
  const [profileUrl, setProfileUrl] = useState("");
  const [error, setError] = useState("");
  const [instances, setInstances] = useState<Instance[]>([]);
  const [showInstanceSuggestions, setShowInstanceSuggestions] = useState(false);
  const [showProfileSuggestions, setShowProfileSuggestions] = useState(false);
  const [filteredInstances, setFilteredInstances] = useState<Instance[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<string[]>([]);
  const [instanceTouched, setInstanceTouched] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Load instances on mount
  useEffect(() => {
    fetch("/data/instances.json")
      .then((res) => res.json())
      .then((data) => setInstances(data))
      .catch(() => setError("Failed to load instances"));
  }, []);

  // Filter instances based on input (no auto-selection)
  useEffect(() => {
    if (instance.trim() && instances.length > 0 && instanceTouched) {
      const filtered = instances.filter(
        (inst) =>
          inst.domain.toLowerCase().includes(instance.toLowerCase()) ||
          inst.name.toLowerCase().includes(instance.toLowerCase())
      );
      setFilteredInstances(filtered.slice(0, 5));
      // Don't show mastodon.social in suggestions if it's the default and not modified
      setShowInstanceSuggestions(filtered.length > 0 && instance !== "mastodon.social");
    } else {
      setShowInstanceSuggestions(false);
    }
  }, [instance, instances, instanceTouched]);

  // Filter profile suggestions, including after the 2nd @
  useEffect(() => {
    if (profileUrl.trim() && instances.length > 0) {
      const cleanInput = profileUrl
        .replace(/^@/, "")
        .replace(/^https?:\/\//, "");
      const parts = cleanInput.split("@");

      if (parts.length < 2) {
        // Not enough info to autocomplete domain
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

      // Filter instances that start with the typed domain part
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

  const handleRedirect = () => {
    setError("");

    if (!instance.trim()) {
      setError("Please enter your instance domain");
      return;
    }

    if (!profileUrl.trim()) {
      setError("Please enter a profile URL");
      return;
    }

    let username = "";
    let domain = "";

    try {
      let cleanUrl = profileUrl
        .trim()
        .replace(/^https?:\/\//, "")
        .replace(/^@/, "");

      if (cleanUrl.includes("@")) {
        const lastAt = cleanUrl.lastIndexOf("@");
        username = cleanUrl.slice(0, lastAt);
        domain = cleanUrl
          .slice(lastAt + 1)
          .split("/")[0]
          .replace(/\/$/, "");
      } else if (cleanUrl.includes("/")) {
        const parts = cleanUrl.split("/");
        domain = parts[0];
        username = parts[parts.length - 1].replace(/^@/, "");
      } else {
        setError(
          "Please include the instance domain. Format: @user@domain.com"
        );
        return;
      }

      if (!username || !domain) {
        setError(
          "Invalid profile URL. Try: @user@domain.com or https://domain.com/@user"
        );
        return;
      }

      const cleanInstance = instance
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "")
        .trim();
      const redirectUrl = `https://${cleanInstance}/@${username}@${domain}`;
      window.open(redirectUrl, "_blank");
    } catch {
      setError("Failed to parse profile URL. Please check the format.");
    }
  };

  const handleInstanceSelect = (domain: string) => {
    setInstance(domain);
    setShowInstanceSuggestions(false);
  };

  const handleProfileSelect = (profile: string) => {
    setProfileUrl(profile);
    setShowProfileSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRedirect();
  };

  // Tab autocomplete for instance
  const handleInstanceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && filteredInstances.length > 0) {
      e.preventDefault();
      setInstance(filteredInstances[0].domain);
      setShowInstanceSuggestions(false);
    }
  };

  // Tab autocomplete for profile
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
            ActivityPub Profile Redirect
          </h1>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 max-w-xl mx-auto">
            Open Fediverse profiles on your home instance. Enter your instance
            and the profile URL you want to view.
          </p>

          <div className="mb-8">
            <a
              href="/redirect/generate"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              🔗 Get a Shareable Link
            </a>
          </div>

          <div className="max-w-2xl mx-auto border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
            <div className="space-y-4 text-left">
              {/* Instance Input */}
              <div className="relative">
                <label
                  htmlFor="instance"
                  className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2"
                >
                  Your Instance
                </label>
                <input
                  type="text"
                  id="instance"
                  value={instance}
                  onChange={(e) => setInstance(e.target.value)}
                  onKeyDown={(e) => {
                    handleKeyPress(e);
                    handleInstanceKeyDown(e);
                  }}
                  onFocus={(e) => {
                    if (!instanceTouched) {
                      e.target.select();
                      setInstanceTouched(true);
                    } else if (instance && instance !== "mastodon.social") {
                      setShowInstanceSuggestions(true);
                    }
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowInstanceSuggestions(false), 200)
                  }
                  placeholder="mastodon.social"
                  autoComplete="off"
                  className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />

                {showInstanceSuggestions && filteredInstances.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredInstances.map((inst) => (
                      <button
                        key={inst.domain}
                        type="button"
                        onClick={() => handleInstanceSelect(inst.domain)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-neutral-900 dark:text-neutral-100">
                            {inst.domain}
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-500">
                            {inst.name}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded">
                          {inst.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                  Defaults to mastodon.social, click to change
                </p>
              </div>

              {/* Profile Input */}
              <div className="relative">
                <label
                  htmlFor="profileUrl"
                  className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2"
                >
                  Profile URL or Handle
                </label>
                <input
                  ref={profileInputRef}
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
                  placeholder="user@instance.com"
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
                  Works with or without @ symbol — press Tab to autocomplete
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-100 rounded-md">
                  {error}
                </div>
              )}

              {/* Redirect */}
              <button
                onClick={handleRedirect}
                className="w-full px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium"
              >
                Open Profile on My Instance 
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="max-w-2xl mx-auto mt-8 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 text-left">
            <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              How to Use
            </h2>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="text-lg">💡</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Quick Start:</strong> The instance field defaults to mastodon.social. Click it to change your home instance.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">⌨️</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Autocomplete:</strong> Press <kbd className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs font-mono">Tab</kbd> to autocomplete suggestions in both fields.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">📝</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Flexible Format:</strong> Enter profiles as <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">@user@domain.com</code>, <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">user@domain.com</code>, or <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">https://domain.com/@user</code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🔗</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Share Links:</strong> Use <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">sayed.app/redirect/@user@domain.com</code> to share direct redirect links.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🌐</span>
                <div>
                  <strong className="text-neutral-900 dark:text-neutral-100">Works With:</strong> Mastodon, Pixelfed, Lemmy, Kbin, PeerTube, Threads, Bridgy Fed, and all ActivityPub platforms.
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-3 justify-center">
            <a
              href="/redirect/generate"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Generate Shareable Link 
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
