// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;

export function middleware(request: NextRequest) {
  const isDomainRoute = request.nextUrl.pathname.startsWith("/domain");

  if (isDomainRoute) {
    const cookie = request.cookies.get("auth");

    if (!cookie || cookie.value !== DASHBOARD_PASSWORD) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/domain/:path*"], // Protect /domain and all nested paths
};
