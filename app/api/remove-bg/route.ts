import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DAILY_LIMIT_PER_IP = parseInt(process.env.DAILY_LIMIT_PER_IP || '3');
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY || 'qi8Myumefx2z4tGFSJhwKcNP';

// Simple in-memory rate limiting for local development
const rateLimit = new Map<string, { count: number; date: string }>();

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  // Get client IP
  const clientIp = request.headers.get('x-forwarded-for') || 
                   request.headers.get('cf-connecting-ip') || 
                   '127.0.0.1';
  const today = new Date().toISOString().slice(0, 10);
  const cacheKey = `${clientIp}:${today}`;

  // Rate limiting check
  const entry = rateLimit.get(cacheKey);
  if (entry && entry.count >= DAILY_LIMIT_PER_IP && entry.date === today) {
    return NextResponse.json(
      { error: '已达到每日限额。每个IP每天最多处理3张图片，请明天再来。' },
      { status: 429 }
    );
  }

  if (!REMOVE_BG_API_KEY) {
    return NextResponse.json(
      { error: 'Remove.bg API 密钥未配置，请设置 REMOVE_BG_API_KEY 环境变量。' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ error: '未提供图片' }, { status: 400 });
    }

    // Check file size
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: '文件大小超过 5MB 限制' }, { status: 400 });
    }

    // Increment rate limit counter
    if (entry && entry.date === today) {
      entry.count += 1;
      rateLimit.set(cacheKey, entry);
    } else {
      rateLimit.set(cacheKey, { count: 1, date: today });
    }

    // Call Remove.bg API
    const removeBgForm = new FormData();
    removeBgForm.append('image_file', image);
    removeBgForm.append('size', 'preview'); // Local can use preview or full if paid

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
      body: removeBgForm,
    });

    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      try {
        const responseText = await response.text();
        console.log(`[Remove.bg API error] status=${response.status}, response=${responseText}`);
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.errors?.[0]?.message || `API error: ${response.status}`;
        } catch {
          errorMessage = responseText || `API error: ${response.status}`;
        }
      } catch (e) {
        console.error('[Remove.bg API] Failed to read error response', e);
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    // Get the processed image blob
    const blob = await response.blob();
    
    // Return the image directly
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="background-removed.png"',
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}