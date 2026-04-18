import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: "/cover-letter",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
