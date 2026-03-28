import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 实验性配置：禁用所有缓存
  experimental: {
    webpackBuildWorker: false,
    optimizeCss: false,
  },
  // Webpack 配置
  webpack: (config, { isServer }) => {
    // 完全禁用缓存
    config.cache = false;
    
    // 如果是服务器端构建，不包含大型依赖
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        '@swc/core-linux-x64-gnu',
        '@swc/core-linux-x64-musl', 
        'esbuild',
        'sharp',
        'workerd'
      ];
    }
    
    return config;
  },
  // 排除大型文件
  outputFileTracingExcludes: {
    "**/*": [
      "**/node_modules/@swc/**",
      "**/node_modules/esbuild/**",
      "**/node_modules/workerd/**",
      "**/node_modules/sharp/**",
    ],
  },
};

// 构建后删除缓存
function postbuild() {
  const cacheDir = path.join(process.cwd(), '.next', 'cache');
  if (fs.existsSync(cacheDir)) {
    try {
      fs.rmSync(cacheDir, { recursive: true, force: true });
      console.log('✓ Deleted .next/cache to reduce output size');
    } catch (e) {
      console.warn('Failed to delete cache:', e);
    }
  }
}

// 导出 postbuild 函数
module.exports = Object.assign(nextConfig, { postbuild });