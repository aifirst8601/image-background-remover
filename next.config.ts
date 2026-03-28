import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

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
  // 构建后删除 cache 目录，减小输出大小
  postbuild: async () => {
    const cacheDir = path.join(process.cwd(), '.next', 'cache');
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true, force: true });
      console.log('Deleted .next/cache directory to reduce output size');
    }
  },
};

export default nextConfig;