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
  // 禁用 build cache 输出到 dist 避免大文件
  experimental: {
    outputFileTracingExcludes: {
      "**/*": [
        "**/node_modules/@swc/core-linux-x64-gnu",
        "**/node_modules/@swc/core-linux-x64-musl",
        "**/node_modules/esbuild/linux",
      ],
    },
  },
};

export default nextConfig;
