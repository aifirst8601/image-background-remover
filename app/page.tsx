'use client';

import React, { useState, useRef, useCallback } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    setProcessedImage(null);
    setProgress(0);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('只允许 JPG 和 PNG 格式图片');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('免费用户图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          handleFile(file);
        }
        break;
      }
    }
  }, [handleFile]);

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const removeBackground = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setError(null);
    setProgress(10);

    try {
      // Convert data URL to Blob
      const response = await fetch(originalImage);
      const blob = await response.blob();
      const file = new File([blob], 'image.' + blob.type.split('/')[1], { type: blob.type });

      const formData = new FormData();
      formData.append('image', file);

      setProgress(30);

      const apiResponse = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!apiResponse.ok) {
        const data = await apiResponse.json();
        throw new Error(data.error || '图片处理失败');
      }

      const processedBlob = await apiResponse.blob();
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);
      setProgress(100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = '背景已移除.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetAll = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            免费图片背景移除工具
          </h1>
          <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
            在线一键去除图片背景 • 100%免费 • 无水印 • 无需注册登录
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Upload Area */}
        {!originalImage && (
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 md:p-16 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png"
              className="hidden"
            />
            <div className="text-6xl mb-4">🖼️</div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              点击或拖拽图片到这里
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              或者按 Ctrl+V 直接粘贴截图
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              支持 JPG / PNG • 最大 5MB • 免费 • 无水印
            </p>
          </div>
        )}

        {/* Original Preview & Processing */}
        {originalImage && !processedImage && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">原始图片</h3>
                <div className="rounded-lg overflow-hidden shadow-md inline-block">
                  <img src={originalImage} alt="原始图片" className="max-w-full h-auto max-h-[400px]" />
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <p className="mb-3 text-blue-800 dark:text-blue-200">正在处理你的图片...</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={removeBackground}
                disabled={isProcessing}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
              >
                {isProcessing ? '处理中...' : '移除背景'}
              </button>
              <button
                onClick={resetAll}
                disabled={isProcessing}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 font-semibold rounded-lg transition-colors"
              >
                重新上传
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {processedImage && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">原始图片</h3>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img src={originalImage!} alt="原始图片" className="max-w-full h-auto" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">处理结果（透明背景）</h3>
                <div className="rounded-lg overflow-hidden shadow-md checkerboard p-4 inline-block">
                  <img
                    src={processedImage}
                    alt="处理结果"
                    className="max-w-full h-auto"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={downloadImage}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                下载 PNG
              </button>
              <button
                onClick={resetAll}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 font-semibold rounded-lg transition-colors"
              >
                处理另一张图片
              </button>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            免费在线图片去背景 — 一键获取透明PNG
          </h2>
          <p>
            我们的免费背景移除工具让你快速轻松地去除任何图片的背景。无需安装软件，无需注册账号，处理结果完全不带水印。
            无论你是摄影师、电商卖家，还是需要编辑社交媒体照片，我们的工具都能在几秒钟内给你专业级的处理结果。
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">功能特点</h3>
          <ul>
            <li><strong>100% 免费：</strong>免费去除图片背景，无隐藏费用</li>
            <li><strong>无水印：</strong>和其他免费工具不同，我们不会在你的图片上添加水印</li>
            <li><strong>无需注册：</strong>立即开始使用，不需要创建账号</li>
            <li><strong>高质量：</strong>采用 Remove.bg AI 技术，边缘检测精准</li>
            <li><strong>透明PNG：</strong>输出干净透明背景，可以直接用于任何场景</li>
            <li><strong>全设备兼容：</strong>支持移动端，手机、平板、电脑都能使用</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">
            如何免费去除图片背景
          </h3>
          <ol>
            <li>通过点击、拖拽或粘贴上传你的图片</li>
            <li>点击"移除背景"按钮</li>
            <li>等待几秒让AI处理完成</li>
            <li>下载处理好的透明PNG图片</li>
          </ol>

          <p>
            完美适用于网店商品图片、头像照片、肖像、平面设计项目等。获取干净透明的背景，随时随地随心使用。
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} 免费图片背景移除工具 • 在线免费工具 • 使用 Next.js + Cloudflare 构建
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/bgremover/about" className="hover:underline">关于我们</a>
            <a href="/bgremover/privacy" className="hover:underline">隐私政策</a>
            <a href="/bgremover/pricing" className="hover:underline">价格套餐</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
