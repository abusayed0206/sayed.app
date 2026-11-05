import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
