import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { project_id, domain } = await req.json();

  const res = await fetch(`https://api.vercel.com/v9/projects/${project_id}/domains`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: domain }),
  });

  if (!res.ok) {
    return NextResponse.json({ success: false, error: await res.text() }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
