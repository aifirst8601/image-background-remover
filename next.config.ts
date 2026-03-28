import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 使用静态导出
  output: "export",
  // 输出目录
  distDir: "out",
  images: {
    unoptimized: true,
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
  // 排除大的二进制文件减小构建输出大小
  outputFileTracingExcludes: {
    "**/*": [
      "**/node_modules/@swc/core-linux-x64-gnu",
      "**/node_modules/@swc/core-linux-x64-musl",
      "**/node_modules/esbuild/linux",
    ],
  },
  // 禁用 webpack 缓存生成
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;