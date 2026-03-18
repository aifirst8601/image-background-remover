import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "价格套餐 - 免费图片背景移除",
  description: "免费图片背景移除价格套餐，提供免费和高级计划。",
};

export default function PricingPage() {
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

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-12">简单透明的定价</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="border rounded-xl p-8 bg-white dark:bg-gray-900 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">免费</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">适合偶尔使用</p>
            <p className="text-4xl font-bold mb-6">¥0<span className="text-lg font-normal text-gray-500">/月</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                每天 3 张图片
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                最大 5MB 文件大小
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                无水印
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                无需注册
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                透明 PNG 输出
              </li>
            </ul>
            <Link
              href="/"
              className="block text-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              开始免费使用
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-blue-600 rounded-xl p-8 bg-blue-50 dark:bg-blue-900/20 shadow-md">
            <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
              即将推出
            </div>
            <h2 className="text-2xl font-bold mb-2">高级版</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">适合频繁用户和专业人士</p>
            <p className="text-4xl font-bold mb-6">¥69<span className="text-lg font-normal text-gray-500">/月</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                每月不限图片数量
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                最大 25MB 文件大小
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                无水印
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                更快处理速度
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                批量处理（即将推出）
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                优先技术支持
              </li>
            </ul>
            <button
              disabled
              className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg opacity-50 cursor-not-allowed"
            >
              即将推出
            </button>
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">常见问题</h3>
          <div className="space-y-6 text-left">
            <div>
              <h4 className="font-semibold">免费计划真的免费吗？</h4>
              <p className="text-gray-600 dark:text-gray-400">
                是的！免费计划永久100%免费。每天赠送3张图片处理额度，无水印，无需注册。
                对于大多数偶尔使用的用户来说，我们认为这已经足够完美。
              </p>
            </div>
            <div>
              <h4 className="font-semibold">高级版什么时候上线？</h4>
              <p className="text-gray-600 dark:text-gray-400">
                我们目前正在用免费套餐测试服务。等我们获得足够的用户和反馈后，
                就会推出支持无限处理的高级套餐。
              </p>
            </div>
            <div>
              <h4 className="font-semibold">你们会存储我的图片吗？</h4>
              <p className="text-gray-600 dark:text-gray-400">
                不会。处理完成后我们不会存储你的图片，图片处理完成后会立即丢弃。
                查看我们的 <Link href="/privacy" className="text-blue-600 hover:underline">隐私政策</Link> 获取更多详情。
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">← 返回首页</Link>
        </p>
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
