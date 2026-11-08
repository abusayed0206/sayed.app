import { NextRequest, NextResponse } from "next/server";

// Fediverse handle as built by /redirect/generate: user@instance.tld
const HANDLE = /^[A-Za-z0-9_.-]{1,64}@(?=.{1,253}$)([A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,63}$/;

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

// Server-side Turnstile check; tokens are single-use and expire after 5 minutes
async function turnstileOk(token: string, ip: string | null, secret: string) {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  return data.success === true && data.action === "shorten";
}

export async function POST(request: NextRequest) {
  const sinkApiUrl = process.env.SINK_API_URL;
  const sinkApiToken = process.env.SINK_API_TOKEN;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  // Fail closed: without the CAPTCHA secret nobody can create links
  if (!sinkApiUrl || !sinkApiToken || !turnstileSecret) return fail("Link shortener is not available", 503);

  const body = await request.json().catch(() => null);
  const handle = typeof body?.handle === "string" ? body.handle.trim().replace(/^@/, "") : "";
  const token = typeof body?.token === "string" ? body.token : "";
  if (!HANDLE.test(handle)) return fail("Invalid profile handle. Format: @user@instance.com", 400);
  if (!token) return fail("Please complete the CAPTCHA", 400);

  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
  if (!(await turnstileOk(token, ip, turnstileSecret))) return fail("CAPTCHA check failed, please try again", 403);

  // The server builds the target, so only sayed.app redirect pages can ever be shortened
  const url = `https://sayed.app/redirect/@${handle}`;

  try {
    const response = await fetch(`${sinkApiUrl}/api/link/create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${sinkApiToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) {
      console.error("Sink API error:", response.status);
      return fail("Failed to create short link", 502);
    }
    const data = await response.json();
    return NextResponse.json({ shortUrl: `https://sayed.app/s/${data.link.slug}` });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return fail("Failed to create short link", 502);
  }
}
