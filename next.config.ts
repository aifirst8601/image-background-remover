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
  // 禁用 webpack 缓存以避免 25MB 限制
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },
};

// postbuild 钩子：构建完成后删除缓存目录
const postbuild = async () => {
  const fs = require('fs');
  const path = require('path');
  const cacheDir = path.join(__dirname, '.next', 'cache');
  
  if (fs.existsSync(cacheDir)) {
    console.log('Deleting .next/cache directory to avoid 25MB limit...');
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('Cache directory deleted.');
  }
};

module.exports = nextConfig;
module.exports.postbuild = postbuild;