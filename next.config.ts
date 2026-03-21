import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Config options for Local Development Server */
  // No output: "export" - using dynamic server
  distDir: ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable basePath for local deployment if needed
  // basePath: "/bgremover",
  // Local server can use cache for faster builds
  webpack: (config, { isServer }) => {
    // Local builds can use cache
    return config;
  },
};

export default nextConfig;
