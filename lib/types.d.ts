import type { D1Database } from '@cloudflare/workers-types'

// 为 Cloudflare Pages 的 D1 绑定添加类型定义
declare global {
  namespace Cloudflare {
    interface Env {
      DB: D1Database
    }
  }
}

export {}