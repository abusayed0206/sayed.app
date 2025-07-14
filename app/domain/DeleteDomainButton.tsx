"use client";
import { useState } from "react";

export default function DeleteDomainButton({
  projectId,
  domains,
}: {
  projectId: string;
  domains: string[];
}) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!selectedDomain) return;

    setLoading(true);

    const res = await fetch("/api/delete-domain", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id: projectId, domain: selectedDomain }),
    });

    setLoading(false);
    setShowPrompt(false);

    if (res.ok) {
      alert(`Domain "${selectedDomain}" deleted.`);
    } else {
      const data = await res.json();
      alert("Failed: " + (data.error || "Unknown error"));
    }
  };

  const triggerDelete = () => {
    if (domains.length === 1) {
      setSelectedDomain(domains[0]);
      handleDelete();
    } else {
      setShowPrompt(true);
    }
  };

  return (
    <>
      <button
        className="btn btn-error btn-outline btn-sm"
        onClick={triggerDelete}
        disabled={loading}
      >
        Delete
      </button>

      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-80">
            <h2 className="text-lg font-semibold mb-3">Delete a Domain</h2>
            <select
              className="select select-bordered w-full mb-4"
              onChange={(e) => setSelectedDomain(e.target.value)}
              value={selectedDomain}
              disabled={loading}
            >
              <option value="">Select domain</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setShowPrompt(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={handleDelete}
                disabled={!selectedDomain || loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
