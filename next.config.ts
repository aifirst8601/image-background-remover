import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  // 禁用 webpack 缓存生成，避免大的 cache 文件
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;