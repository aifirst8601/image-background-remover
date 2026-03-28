import { auth } from '@/lib/auth'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { drizzle } from 'drizzle-orm/d1'
import { dailyUsage } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// GET: 查询今日使用次数
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    
    // 使用 getRequestContext() 获取 D1 数据库
    const ctx = getRequestContext()
    const db = drizzle((ctx.env as any).DB)
    
    const result = await db
      .select()
      .from(dailyUsage)
      .where(and(
        eq(dailyUsage.userId, session.user.id),
        eq(dailyUsage.date, today)
      ))
      .limit(1)
    
    const used = result.length > 0 ? (result[0]?.count ?? 0) : 0
    
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
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { date } = await request.json() as { date?: string }
    const today = date || new Date().toISOString().split('T')[0]
    
    // 使用 getRequestContext() 获取 D1 数据库
    const ctx = getRequestContext()
    const db = drizzle((ctx.env as any).DB)
    
    // 检查今天是否已有记录
    const existing = await db
      .select()
      .from(dailyUsage)
      .where(and(
        eq(dailyUsage.userId, session.user.id),
        eq(dailyUsage.date, today)
      ))
      .limit(1)
    
    if (existing.length > 0) {
      const record = existing[0]!
      const currentCount = record.count ?? 0
      // 更新计数
      await db
        .update(dailyUsage)
        .set({ count: currentCount + 1 })
        .where(and(
          eq(dailyUsage.userId, session.user.id),
          eq(dailyUsage.date, today)
        ))
    } else {
      // 插入新记录
      await db
        .insert(dailyUsage)
        .values({
          userId: session.user.id,
          date: today,
          count: 1,
        })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Usage POST error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}