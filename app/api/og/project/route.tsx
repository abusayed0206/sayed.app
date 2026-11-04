import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Same paper/ink palette as the site (app/globals.css, light theme).
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "Projects by Abu Sayed").slice(0, 90);
  const tagline = (searchParams.get("tagline") || "").slice(0, 140);
  const category = (searchParams.get("category") || "Project hub").slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f2ec",
          backgroundImage: "linear-gradient(#dcd8cc 1px, transparent 1px), linear-gradient(90deg, #dcd8cc 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          padding: "64px 72px",
          color: "#161614",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontFamily: "monospace" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#e2483d" }} />
          sayed.app
          <span style={{ color: "#75726a" }}>/ {category}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: title.length > 40 ? 72 : 96, lineHeight: 1, letterSpacing: "-0.03em", fontFamily: "serif" }}>{title}</div>
          {tagline && <div style={{ fontSize: 32, color: "#3d3b36", lineHeight: 1.3, maxWidth: 960 }}>{tagline}</div>}
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: "#0f6b4a" }} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
