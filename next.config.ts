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
};

export default nextConfig;
