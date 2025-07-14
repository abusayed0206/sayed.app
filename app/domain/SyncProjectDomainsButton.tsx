"use client";
import { useState } from "react";

export default function SyncProjectDomainsButton({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    const res = await fetch(`/api/sync-domains/${projectId}`, { method: "POST" });
    setLoading(false);
    if (res.ok) {
      alert("Domains synced!");
      window.location.reload();
    } else {
      alert("Failed to sync domains");
    }
  };

  return (
    <button
      onClick={handleSync}
      className="bg-yellow-500 text-white px-2 py-1 rounded"
      disabled={loading}
    >
      {loading ? "Syncing..." : "Sync"}
    </button>
  );
}
