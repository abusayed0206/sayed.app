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
            background: "#FAFAF9",
            padding: "60px 80px",
            position: "relative",
          }}
        >
          {/* Top border accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: "#1C1917",
            }}
          />

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              gap: "20px",
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: title.length > 30 ? "48px" : "60px",
                fontWeight: "700",
                color: "#1C1917",
                lineHeight: "1.15",
                textAlign: "center",
                letterSpacing: "-0.03em",
                maxWidth: "100%",
                wordWrap: "break-word",
              }}
            >
              {title}
            </div>

            {/* Divider */}
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "#A8A29E",
                borderRadius: "2px",
              }}
            />

            {/* Subtitle */}
            <div
              style={{
                fontSize: "22px",
                color: "#57534E",
                fontWeight: "400",
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              sayed.app
            </div>
          </div>

          {/* Bottom corner tag */}
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              right: "40px",
              fontSize: "14px",
              color: "#A8A29E",
              letterSpacing: "0.05em",
            }}
          >
            Project
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
