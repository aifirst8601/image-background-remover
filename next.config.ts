import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Config options for Cloudflare Pages */
  output: "export",
  eslint: {
    // 忽略构建时的 ESLint 检查警告/错误，不影响运行
    ignoreDuringBuilds: true,
  },
  basePath: "/bgremover",
  distDir: "out",
};

export default nextConfig;
