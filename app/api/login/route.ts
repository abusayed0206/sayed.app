// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;

  if (
    password === DASHBOARD_PASSWORD &&
    typeof DASHBOARD_PASSWORD === "string"
  ) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("auth", DASHBOARD_PASSWORD, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return res;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
