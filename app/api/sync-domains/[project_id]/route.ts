/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VERCEL_TOKEN = process.env.VERCEL_API_KEY!;

export async function POST(
  req: Request,
  context: { params: Promise<{ project_id: string }> }
) {
  const supabase = await createClient();
  const { project_id } = await context.params;

  try {
    const res = await fetch(
      `https://api.vercel.com/v9/projects/${project_id}/domains`,
      {
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: await res.text() }, { status: 400 });
    }

    const { domains } = await res.json();
    const formatted = domains.map((d: any) => ({
      project_id,
      domain: d.name,
      is_custom: d.name.endsWith(".vercel.app") ? false : true,
    }));

    // Upsert domains for this project (composite key)
    const { error: upsertError } = await supabase
      .from("domains")
      .upsert(formatted, { onConflict: "project_id,domain" });
    if (upsertError) throw upsertError;

    return NextResponse.json({ inserted: formatted.length });
  } catch (e) {
    console.error("Sync domains for project failed:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
