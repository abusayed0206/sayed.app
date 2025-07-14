/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VERCEL_TOKEN = process.env.VERCEL_API_KEY!;
const PAGE_SIZE = 100;

export async function POST() {
  const supabase = await createClient();

  let projects: any[] = [];
  let next = null;

  try {
    do {
      const res: Response = await fetch(
        `https://api.vercel.com/v9/projects?limit=${PAGE_SIZE}${
          next ? `&until=${next}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${VERCEL_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        console.error(await res.text());
        return NextResponse.json(
          { error: "Failed to fetch projects" },
          { status: 500 }
        );
      }

      const data = await res.json();
      projects.push(...data.projects);
      next = data.pagination?.next;
    } while (next);

    // Upsert to Supabase
    const formatted = projects.map((p: any) => ({
      id: p.id,
      name: p.name,
      git_repo: p.link?.repo || null,
      last_updated: new Date().toISOString(),
    }));

    const { error } = await supabase.from("projects").upsert(formatted);
    if (error) throw error;

    return NextResponse.json({ inserted: formatted.length });
  } catch (e) {
    console.error("Sync projects failed:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
