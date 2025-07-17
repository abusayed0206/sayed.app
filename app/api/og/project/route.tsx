import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Project";
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            padding: "60px 120px",
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "700",
              color: "#334155",
              lineHeight: "1.1",
              marginBottom: "24px",
              textAlign: "center",
              letterSpacing: "-0.02em",
              maxWidth: "100%",
              wordWrap: "break-word",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "24px",
              color: "#64748b",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            A project by sayed.app
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.log(`${errorMessage}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
