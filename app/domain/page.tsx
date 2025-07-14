import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import SyncWrapper from "./SyncWrapper";
import SyncProjectDomainsButton from "./SyncProjectDomainsButton";
import AssignDomainButton from "./AssignDomainButton";
import DeleteDomainButton from "./DeleteDomainButton";

const PAGE_SIZE = 10;

export default async function DomainPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1");
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  const {
    data: projects,
    count,
    error,
  } = await supabase
    .from("projects")
    .select("id, name, git_repo, last_updated, domains(domain, is_custom)", {
      count: "exact",
    })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

  if (error) {
    console.error("Failed to fetch projects:", error.message);
  }

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">
        🌐 Project Domains Management
      </h1>

      <div className="flex justify-center">
        <SyncWrapper />
      </div>

      <div className="overflow-x-auto mt-6">
        <div className="bg-base-100 shadow-md rounded-xl p-4">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200">
              <tr>
                {/* <th>Project ID</th> */}
                <th className="text-center">Git Repo</th>
                <th className="text-center">Vercel Domains</th>
                <th className="text-center">Custom Domains</th>
                <th className="text-center">Last Updated</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((proj) => {
                const vercelDomains =
                  proj.domains
                    ?.filter((d) => !d.is_custom)
                    .map((d) => d.domain)
                    .join(", ") || "-";

                const customDomains =
                  proj.domains
                    ?.filter((d) => d.is_custom)
                    .map((d) => d.domain)
                    .join(", ") || "-";

                return (
                  <tr key={proj.id} className="text-center">
                    <td>
                      {proj.git_repo ? (
                        <a
                          href={proj.git_repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary break-all"
                        >
                          {proj.git_repo}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {vercelDomains !== "-"
                        ? vercelDomains.split(", ").map((domain, i) => (
                            <a
                              key={i}
                              href={`https://${domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link link-accent block"
                            >
                              {domain}
                            </a>
                          ))
                        : "-"}
                    </td>
                    <td>
                      {customDomains !== "-"
                        ? customDomains.split(", ").map((domain, i) => (
                            <a
                              key={i}
                              href={`https://${domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link link-secondary block"
                            >
                              {domain}
                            </a>
                          ))
                        : "-"}
                    </td>
                    <td>{new Date(proj.last_updated).toLocaleString()}</td>
                    <td>
                      <div className="flex justify-center flex-wrap gap-2">
                        <AssignDomainButton projectId={proj.id} />
                        <SyncProjectDomainsButton projectId={proj.id} />
                        <DeleteDomainButton
                          projectId={proj.id}
                          domains={(proj.domains || []).map((d) => d.domain)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Centered */}
      <div className="flex justify-center mt-6">
        <div className="join">
          {page > 1 && (
            <Link
              href={`/domain?page=${page - 1}`}
              className="join-item btn btn-outline btn-sm"
            >
              ← Previous
            </Link>
          )}
          <button className="join-item btn btn-sm btn-disabled">
            Page {page} of {totalPages}
          </button>
          {page < totalPages && (
            <Link
              href={`/domain?page=${page + 1}`}
              className="join-item btn btn-outline btn-sm"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
