import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 使用标准 Next.js 部署
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;