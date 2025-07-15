import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;

// List of unwanted paths
const blockedPaths = [
  "/config.php",
  "/wp-admin",
  "/wp-admin/setup-config.php",
  "/wordpress",
  "/wordpress/wp-admin/setup-config.php",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Block known WordPress bot paths
  if (blockedPaths.some((path) => pathname.startsWith(path))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Domain dashboard auth check
  const isDomainRoute = pathname.startsWith("/domain");
  if (isDomainRoute) {
    const cookie = request.cookies.get("auth");
    if (!cookie || cookie.value !== DASHBOARD_PASSWORD) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // Match all routes so blocking works globally
};
