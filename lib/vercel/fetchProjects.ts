const VERCEL_API = "https://api.vercel.com/v9/projects";

interface Project {
  id: string;
  name: string;
  // Add other relevant fields as needed
}

export async function fetchAllVercelProjects(): Promise<Project[]> {
  const projects: Project[] = [];
  let next: number | null = null;

  while (true) {
    const url = new URL(VERCEL_API);
    url.searchParams.set("limit", "100");
    if (next) url.searchParams.set("until", next.toString());

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_KEY}`,
      },
    });

    const json = await res.json();
    projects.push(...json.projects);

    if (!json.pagination?.next) break;
    next = json.pagination.next;
  }

  return projects;
}
