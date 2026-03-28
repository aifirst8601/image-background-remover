import { handlers } from "@/lib/auth"
import type { NextRequest } from "next/server"

// Cloudflare Pages 需要使用 fetch 请求处理程序
export const GET = handlers.GET
export const POST = handlers.POST

// 导出配置以供 next-auth 使用
export const runtime = 'edge'