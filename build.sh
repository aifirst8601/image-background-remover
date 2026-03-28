#!/bin/bash
set -e

echo "Starting build..."

# 运行 Next.js 构建
npx next build

# 构建完成后删除 cache 目录
echo "Cleaning up cache..."
rm -rf .next/cache

echo "Build completed successfully!"