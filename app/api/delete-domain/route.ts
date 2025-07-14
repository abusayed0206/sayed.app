// app/api/delete-domain/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VERCEL_TOKEN = process.env.VERCEL_API_KEY!;

export async function DELETE(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { project_id, domain } = body;

  if (!project_id || !domain) {
    return NextResponse.json(
      { error: "Missing project_id or domain" },
      { status: 400 }
    );
  }

  try {
    // 1. Remove domain from Vercel
    const vercelRes = await fetch(
      `https://api.vercel.com/v9/projects/${project_id}/domains/${domain}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
      }
    );

    if (!vercelRes.ok) {
      const errText = await vercelRes.text();
      return NextResponse.json({ error: errText }, { status: 400 });
    }

    // 2. Remove from Supabase
    const { error: dbError } = await supabase
      .from("domains")
      .delete()
      .eq("project_id", project_id)
      .eq("domain", domain);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete domain:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
