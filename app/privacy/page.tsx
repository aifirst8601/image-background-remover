import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隐私政策 - 免费图片背景移除",
  description: "免费图片背景移除工具隐私政策。",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-6">隐私政策</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>最后更新：2026年3月18日</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">概述</h2>
          <p>
            我们尊重你的隐私，并致力于保护你的个人数据。本隐私政策将告诉你，当你访问我们网站时，我们如何处理你的个人数据，以及你拥有哪些隐私权利。
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">我们收集哪些数据</h2>
          <ul>
            <li>我们不要求你创建账号或提供个人信息</li>
            <li>你上传的图片仅用于去除背景处理，处理完成后我们不会在服务器上存储</li>
            <li>我们仅通过IP地址进行基本限流，防止免费服务被滥用</li>
            <li>IP地址不会永久存储，限流计数会在24小时后自动过期删除</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">第三方服务</h2>
          <p>
            我们使用 Remove.bg API 来处理你的图片和去除背景。当你上传图片时，它会被发送到 Remove.bg 进行处理。
            关于他们如何处理你的数据，请参阅 Remove.bg 的隐私政策了解更多信息。
          </p>

          <p>
            如果我们展示广告，第三方广告商可能会收集并使用 Cookie 和类似技术来收集数据用于个性化广告。
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Cookie</h2>
          <p>
            基础功能我们不使用必要的 Cookie。如果未来我们添加分析或广告功能，这些功能可能会使用 Cookie。
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">你的权利</h2>
          <p>
            由于我们不永久存储你的任何个人数据，应你的要求我们也无需提供任何数据。所有限流数据会在24小时后自动删除。
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">隐私政策变更</h2>
          <p>
            我们可能会不时更新本隐私政策。最新版本将始终在此页面上提供。
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
