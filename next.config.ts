import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 使用标准 Next.js 部署，不需要 output: export
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;