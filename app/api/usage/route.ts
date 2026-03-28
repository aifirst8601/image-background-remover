import { auth } from '@/lib/auth'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// GET: 查询今日使用次数
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.email
    const today = new Date().toISOString().split('T')[0]
    
    // 使用 getRequestContext() 获取 D1 数据库
    const ctx = getRequestContext()
    const db = (ctx.env as any).DB as D1Database
    
    // 查询今日使用次数
    const row = await db.prepare(
      "SELECT count FROM daily_usage WHERE user_id = ? AND date = ?"
    ).bind(userId, today).first() as { count: number } | null
    
    const used = row?.count ?? 0
    
    return NextResponse.json({ used, limit: 10 })
  } catch (error) {
    console.error('Usage GET error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// POST: 记录使用次数
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.email
    const today = new Date().toISOString().split('T')[0]
    
    // 使用 getRequestContext() 获取 D1 数据库
    const ctx = getRequestContext()
    const db = (ctx.env as any).DB as D1Database
    
    // 检查今天是否已有记录
    const existing = await db.prepare(
      "SELECT count FROM daily_usage WHERE user_id = ? AND date = ?"
    ).bind(userId, today).first() as { count: number } | null
    
    if (existing) {
      // 更新计数
      await db.prepare(
        "UPDATE daily_usage SET count = count + 1 WHERE user_id = ? AND date = ?"
      ).bind(userId, today).run()
    } else {
      // 插入新记录
      await db.prepare(
        "INSERT INTO daily_usage (user_id, date, count) VALUES (?, ?, 1)"
      ).bind(userId, today).run()
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Usage POST error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}