import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sayed.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  // Project URLs that were live from the old worker-astro branch.
  async redirects() {
    return [
      ["bangla-saver", "banglasaver"],
      ["kriti-bangla-fonts", "kriti-wordpress"],
      ["bangla-library", "bangla-library-windows"],
      ["kriti-firefox-addon", "kriti-firefox"],
    ].map(([from, to]) => ({ source: `/projects/${from}`, destination: `/projects/${to}`, permanent: true }));
  },
};

export default nextConfig;
