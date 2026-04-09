import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "imgproxy.fourthwall.com" },
    ],
  },
};

export default nextConfig;
