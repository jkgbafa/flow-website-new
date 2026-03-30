import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "imgproxy.fourthwall.com" },
    ],
  },
};

export default nextConfig;
