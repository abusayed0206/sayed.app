/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VERCEL_TOKEN = process.env.VERCEL_API_KEY!;

export async function POST() {
  const supabase = await createClient();

  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id");
    if (error) throw error;

    const allDomains: any[] = [];

    for (const project of projects || []) {
      const res = await fetch(
        `https://api.vercel.com/v9/projects/${project.id}/domains`,
        {
          headers: {
            Authorization: `Bearer ${VERCEL_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        console.warn(`Failed to fetch domains for ${project.id}`);
        continue;
      }

      const { domains } = await res.json();

      const formatted = domains.map((d: any) => ({
        project_id: project.id,
        domain: d.name,
        is_custom: d.name.endsWith(".vercel.app") ? false : true,
      }));

      allDomains.push(...formatted);

      // Add a 2-second delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Upsert new domains using composite key
    const { error: upsertError } = await supabase
      .from("domains")
      .upsert(allDomains, { onConflict: "project_id,domain" });
    if (upsertError) throw upsertError;

    return NextResponse.json({ inserted: allDomains.length });
  } catch (e) {
    console.error("Sync domains failed:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
