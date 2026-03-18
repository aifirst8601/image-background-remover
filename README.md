# 免费图片背景移除工具

免费在线图片背景去除，基于 Next.js + Tailwind CSS + Remove.bg API 构建，可部署到 Cloudflare Pages。

✨ **功能特点**
- 每个IP每天免费处理 3 张图片
- 处理结果**无水印**
- 无需注册登录即可使用
- 支持点击上传、拖拽上传、粘贴剪贴板截图
- 响应式设计，手机、平板、桌面都能用
- AI 驱动，精准去除背景
- Cloudflare 原生部署，成本低廉，全球加速

## 技术栈

- **框架:** Next.js 15（App Router）
- **样式:** Tailwind CSS
- **部署:** Cloudflare Pages
- **AI 抠图:** Remove.bg API
- **限流:** Cloudflare KV（生产环境），内存限流（开发环境）

## 快速开始

### 环境要求

- Node.js 18+
- Remove.bg API 密钥（在 [remove.bg/api](https://www.remove.bg/api) 获取）

### 安装依赖

```bash
# 安装依赖
npm install
```

### 环境变量

复制 `.env.example` 到 `.env.local`:

```bash
cp .env.example .env.local
```

编辑 `.env.local` 添加你的 Remove.bg API 密钥:

```
REMOVE_BG_API_KEY=你的API密钥
ALLOWED_ORIGIN=*
DAILY_LIMIT_PER_IP=3
```

### 本地开发

```bash
npm run dev
```

在浏览器打开 http://你的服务器IP:3001 即可访问。

### 构建

```bash
npm run build
```

### 部署到 Cloudflare Pages

1. 将代码推送到 GitHub
2. 在 Cloudflare Pages 连接你的 GitHub 仓库
3. 构建命令设置为 `npm run build`
4. 输出目录设置为 `.next`
5. 在 Cloudflare Pages 控制台添加环境变量:
   - `REMOVE_BG_API_KEY` - 你的 Remove.bg API 密钥
   - `ALLOWED_ORIGIN` - 你的域名（例如 `https://bgremove.yourdomain.com`）
   - `DAILY_LIMIT_PER_IP` - `3`
6. 点击部署！

**注意:** Cloudflare Pages 现在已经原生支持 Next.js App Router。

## 已实现功能

- ✅ 拖拽上传
- ✅ 剪贴板粘贴
- ✅ 文件大小/类型验证
- ✅ 按IP限流（免费用户每天3张）
- ✅ 透明PNG输出，棋盘格预览
- ✅ SEO 优化元标签
- ✅ 关于、隐私政策、定价页面
- ✅ 全响应式设计
- ✅ **无水印** — 和其他免费工具相比的核心优势
- ✅ 无需登录

## 项目结构

```
/
├── app/
│   ├── api/
│   │   └── remove-bg/
│   │       └── route.ts      # 背景移除API接口
│   ├── about/
│   │   └── page.tsx          # 关于我们页面
│   ├── privacy/
│   │   └── page.tsx          # 隐私政策页面
│   ├── pricing/
│   │   └── page.tsx          # 定价页面
│   ├── globals.css           # 全局样式
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 首页（上传和处理）
├── public/                   # 静态资源
├── .env.example              # 环境变量示例
├── _routes.json              # Cloudflare Pages 路由配置
├── next.config.ts           # Next.js 配置
├── tailwind.config.ts        # Tailwind 配置
└── tsconfig.json             # TypeScript 配置
```

## MVP 范围

这是一个最小可行产品:
- 核心功能：上传 → 移除背景 → 下载PNG
- 免费套餐：每个IP每天3张
- 无水印，无需登录
- Cloudflare 部署，成本极低
- 快速验证产品/市场匹配

## 许可证

MIT
