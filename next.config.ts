/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // 禁用 webpack 缓存
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.cache = false;
    }
    return config;
  },
};

// postbuild 函数 - 在构建完成后删除 cache 目录
// 这个函数会在 next build 完成后自动被调用
if (require.main === module || process.env.NEXT_POSTBUILD) {
  const fs = require('fs');
  const path = require('path');
  const cacheDir = path.join(process.cwd(), '.next', 'cache');
  if (fs.existsSync(cacheDir)) {
    try {
      fs.rmSync(cacheDir, { recursive: true, force: true });
      console.log('✓ Deleted .next/cache directory');
    } catch (e) {
      console.warn('Warning: Failed to delete cache:', e.message);
    }
  }
}

module.exports = nextConfig;