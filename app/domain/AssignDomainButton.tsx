"use client";
import { useState } from "react";

export default function AssignDomainButton({ projectId }: { projectId: string }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    setLoading(true);
    const res = await fetch("/api/assign-domain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id: projectId, domain }),
    });
    setLoading(false);
    setShowPrompt(false);
    if (res.ok) {
      alert("Domain assigned!");
    } else {
      const data = await res.json();
      alert("Failed: " + (data.error || "Unknown error"));
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        onClick={() => setShowPrompt(true)}
        disabled={loading}
      >
        Assign
      </button>
      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="mb-2 font-bold">Assign Custom Domain</h2>
            <input
              type="text"
              className="border px-2 py-1 w-full mb-3"
              placeholder="Enter custom domain"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              disabled={loading}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setShowPrompt(false)}
                disabled={loading}
              >Cancel</button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={handleAssign}
                disabled={loading || !domain}
              >{loading ? "Assigning..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
