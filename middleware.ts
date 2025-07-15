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

  // List of protected API routes
  const protectedApiRoutes = [
    "/api/assign-domain",
    "/api/delete-domain",
    "/api/sync-projects",
    "/api/sync-domains",
    // Protect dynamic route as well
    "/api/sync-domains/",
  ];

  // Check if request is for domain page or protected API route
  const isDomainRoute = pathname.startsWith("/domain");
  const isProtectedApiRoute =
    protectedApiRoutes.some((route) => pathname === route || pathname.startsWith(route)) ||
    // Special case for /api/sync-domains/[project_id]
    /^\/api\/sync-domains\/[\w-]+$/.test(pathname);

  if (isDomainRoute || isProtectedApiRoute) {
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
