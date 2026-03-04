import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/og/**",
      },
      {
        pathname: "/imgs/**",
      },
    ],
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
};

export default nextConfig;
