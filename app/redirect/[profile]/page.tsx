"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Instance {
  domain: string;
  name: string;
  type: string;
}

export default function ProfileRedirectPage() {
  const params = useParams();
  const profileParam = params.profile as string;
  
  // Decode and normalize the profile handle
  // Only accept profiles with @ in them
  const decodedProfile = decodeURIComponent(profileParam);
  const normalizedProfile = decodedProfile.replace(/^@/, "");
  
  // If no @ in the handle, show error
  if (!normalizedProfile.includes("@")) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-3 text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
              Invalid Profile Handle
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-8">
              Profile handle must contain @ symbol. Format: @user@domain.com
            </p>
            <a
              href="/redirect/generate"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-md hover:bg-[var(--color-bg-muted)] dark:hover:bg-[var(--color-bg-muted-dark)] transition-colors"
            >
              ← Generate a Valid Link
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  const profileUrl = `@${normalizedProfile}`;

  const [instance, setInstance] = useState("mastodon.social");
  const [instanceTouched, setInstanceTouched] = useState(false);
  const [error, setError] = useState("");
  const [instances, setInstances] = useState<Instance[]>([]);
  const [showInstanceSuggestions, setShowInstanceSuggestions] = useState(false);
  const [filteredInstances, setFilteredInstances] = useState<Instance[]>([]);

  // Load instances on mount
  useEffect(() => {
    fetch("/data/instances.json")
      .then((res) => res.json())
      .then((data) => setInstances(data))
      .catch(() => setError("Failed to load instances"));
  }, []);

  // Filter instances based on input
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

  const handleRedirect = () => {
    setError("");

    if (!instance.trim()) {
      setError("Please enter your instance domain");
      return;
    }

    let username = "";
    let domain = "";

    try {
      let cleanUrl = normalizedProfile.trim();

      if (cleanUrl.includes("@")) {
        const lastAt = cleanUrl.lastIndexOf("@");
        username = cleanUrl.slice(0, lastAt);
        domain = cleanUrl.slice(lastAt + 1).split("/")[0].replace(/\/$/, "");
      } else {
        setError("Invalid profile format");
        return;
      }

      if (!username || !domain) {
        setError("Invalid profile URL");
        return;
      }

      const cleanInstance = instance
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "")
        .trim();
      const redirectUrl = `https://${cleanInstance}/@${username}@${domain}`;
      window.open(redirectUrl, "_blank");
    } catch {
      setError("Failed to parse profile URL");
    }
  };

  const handleInstanceSelect = (domain: string) => {
    setInstance(domain);
    setShowInstanceSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRedirect();
  };

  const handleInstanceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && filteredInstances.length > 0) {
      e.preventDefault();
      setInstance(filteredInstances[0].domain);
      setShowInstanceSuggestions(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3 text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            Open Profile on Your Instance
          </h1>

          <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-2 max-w-xl mx-auto">
            Opening <span className="font-mono bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] px-2 py-0.5 rounded">{profileUrl}</span> on your home instance.
          </p>
          
          <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] mb-8">
            Select or type your instance below, then click to redirect.
          </p>

          <div className="max-w-2xl mx-auto border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg p-6">
            <div className="space-y-4 text-left">
              {/* Profile Display */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-text-dark)] mb-2">
                  Profile to Open
                </label>
                <div className="w-full px-4 py-2 text-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] font-mono">
                  {profileUrl}
                </div>
                <p className="mt-1 text-xs text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
                  This profile will be opened on your instance
                </p>
              </div>

              {/* Instance Input */}
              <div className="relative">
                <label
                  htmlFor="instance"
                  className="block text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-text-dark)] mb-2"
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
                  className="w-full px-4 py-2 text-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-md bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] placeholder-[var(--color-text-muted)] dark:placeholder-[var(--color-text-muted-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                />

                {showInstanceSuggestions && filteredInstances.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredInstances.map((inst) => (
                      <button
                        key={inst.domain}
                        type="button"
                        onClick={() => handleInstanceSelect(inst.domain)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-bg-muted)] dark:hover:bg-[var(--color-bg-muted-dark)] flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                            {inst.domain}
                          </div>
                          <div className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
                            {inst.name}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] rounded">
                          {inst.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-xs text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
                  Defaults to mastodon.social, click to change
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
                className="w-full px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors font-medium"
              >
                Open {profileUrl} on {instance} 
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="max-w-2xl mx-auto mt-8 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg p-6 text-left">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
              Quick Guide
            </h2>
            <ul className="space-y-3 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
              <li className="flex items-start gap-3">
                <span className="text-lg">💡</span>
                <div>
                  <strong className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">Default Instance:</strong> The instance field is pre-filled with mastodon.social. Click or start typing to change it.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">⌨️</span>
                <div>
                  <strong className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">Autocomplete:</strong> Press <kbd className="px-2 py-0.5 bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] rounded text-xs font-mono">Tab</kbd> to autocomplete from popular instances, or <kbd className="px-2 py-0.5 bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] rounded text-xs font-mono">Enter</kbd> to redirect.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg">🔗</span>
                <div>
                  <strong className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">Share This Link:</strong> You can share <code className="px-1 py-0.5 bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg-muted-dark)] rounded">sayed.app/redirect/{profileParam}</code> with anyone to help them open this profile on their instance.
                </div>
              </li>
            </ul>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex gap-3 justify-center">
            <a
              href="/redirect"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-md hover:bg-[var(--color-bg-muted)] dark:hover:bg-[var(--color-bg-muted-dark)] transition-colors"
            >
              ← Redirect Another Profile
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-md hover:bg-[var(--color-bg-muted)] dark:hover:bg-[var(--color-bg-muted-dark)] transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
