import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 60,
  },
};

export default nextConfig;
