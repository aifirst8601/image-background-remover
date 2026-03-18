import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于我们 - 免费图片背景移除",
  description: "了解我们免费在线图片去背景工具。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              免费图片背景移除
            </Link>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">关于我们</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>
            我们创建这个免费背景移除工具，是为了让每个人都能获得高质量的背景去除服务，
            而不用忍受其他工具带来的水印、强制注册和高昂价格。
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">我们的使命</h2>
          <p>
            我们的使命很简单：提供一个快速、免费、易用的工具，它就是能搞定。
            我们相信基础的图片编辑应该对所有人开放，不论你的预算如何。
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">为什么选择我们的工具？</h2>
          <ul>
            <li><strong>无水印：</strong>处理完的图片完全归你，我们不会添加水印破坏它</li>
            <li><strong>无需注册：</strong>立即开始使用，不需要创建账号</li>
            <li><strong>永久免费：</strong>每个用户每天免费处理 3 张图片，永久有效</li>
            <li><strong>AI 驱动：</strong>采用最先进的 AI 技术，背景去除精准</li>
            <li><strong>隐私保护：</strong>处理后我们就删除你的图片，不会存储</li>
          </ul>

          <p>
            如果你喜欢我们的工具，并且每天需要处理超过 3 张图片，未来我们会推出高级套餐。
            但我们会永远保留免费套餐，对所有人开放。
          </p>

          <p className="mt-8">
            <Link href="/" className="text-blue-600 hover:underline">← 返回首页</Link>
          </p>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 pt-8 border-t text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} 免费图片背景移除 • 在线免费工具 • 使用 Next.js + Cloudflare 构建
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/about" className="hover:underline">关于我们</Link>
          <Link href="/privacy" className="hover:underline">隐私政策</Link>
          <Link href="/pricing" className="hover:underline">价格套餐</Link>
        </div>
      </footer>
    </div>
  );
}
