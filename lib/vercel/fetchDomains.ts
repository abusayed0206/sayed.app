export async function fetchProjectDomains(projectId: string) {
  const res = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/domains`,
    {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_KEY}`,
      },
    }
  );

  if (!res.ok) throw new Error(`Error fetching domains for ${projectId}`);
  const json = await res.json();
  return json.domains;
}
