import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 禁用 webpack 缓存，避免生成大的 cache 文件
  webpack: (config, { isServer, dev }) => {
    // 禁用缓存
    config.cache = false;
    // 排除大型 node_modules
    config.externals = [...(config.externals || []), '@swc/core-linux-x64-gnu', '@swc/core-linux-x64-musl', 'esbuild'];
    return config;
  },
  // 排除大型文件减小输出
  outputFileTracingExcludes: {
    "**/*": [
      "**/node_modules/@swc/core-linux-x64-gnu/**",
      "**/node_modules/@swc/core-linux-x64-musl/**",
      "**/node_modules/esbuild/**",
      "**/node_modules/workerd/**",
    ],
  },
};

export default nextConfig;