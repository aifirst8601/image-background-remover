import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Config options for Cloudflare Pages */
  output: "standalone",
  distDir: "out",
  eslint: {
    // 忽略构建时的 ESLint 检查警告/错误，不影响运行
    ignoreDuringBuilds: true,
  },
  basePath: "/bgremover",
  // 排除大的二进制文件减小构建输出大小
  outputFileTracingExcludes: {
    "**/*": [
      "**/node_modules/@swc/core-linux-x64-gnu",
      "**/node_modules/@swc/core-linux-x64-musl",
      "**/node_modules/esbuild/linux",
      "**/out/cache/**/*",
    ],
  },
  // 禁用 webpack 缓存生成，避免 25.3MB 文件
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
