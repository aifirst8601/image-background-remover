import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "免费图片背景移除 - 在线一键去背景 无水印",
  description: "免费在线图片背景移除工具，一键去除图片背景，导出透明PNG。100%免费，无水印，无需注册登录。",
  keywords: "免费去背景,图片背景移除,抠图,在线抠图,去除背景,透明png,无水印,免费抠图",
  openGraph: {
    title: "免费图片背景移除 - 在线一键去背景 无水印",
    description: "免费在线图片背景移除工具，一键去除图片背景，导出透明PNG。100%免费，无水印，无需注册登录。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
