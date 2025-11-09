import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const sinkApiUrl = process.env.SINK_API_URL;
    const sinkApiToken = process.env.SINK_API_TOKEN;

    if (!sinkApiUrl || !sinkApiToken) {
      return NextResponse.json(
        { error: "Link shortener service is not configured" },
        { status: 500 }
      );
    }

    // Call Sink API to create short link
    const response = await fetch(`${sinkApiUrl}/api/link/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sinkApiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        // Let Sink auto-generate the slug
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Sink API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create short link" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Return the shortened URL with our domain
    return NextResponse.json({
      success: true,
      shortUrl: `https://sayed.app/s/${data.link.slug}`,
      slug: data.link.slug,
      originalUrl: data.link.url,
    });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
