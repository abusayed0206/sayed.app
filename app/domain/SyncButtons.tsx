/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";

export default function SyncButtons() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const handleSync = async (type: "projects" | "domains") => {
    setMessage(`Syncing ${type}...`);

    try {
      const res = await fetch(`/api/sync-${type}`, {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setMessage(`✅ Synced ${data.inserted} ${type}`);
    } catch (e: any) {
      console.error(e);
      setMessage(`❌ Failed to sync ${type}`);
    }

    // Hide message after 3s
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-x-4 flex items-center">
      <button
        onClick={() => startTransition(() => handleSync("projects"))}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update Projects"}
      </button>

      <button
        onClick={() => startTransition(() => handleSync("domains"))}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update Domains"}
      </button>

      {message && <span className="text-sm text-gray-600">{message}</span>}
    </div>
  );
}
