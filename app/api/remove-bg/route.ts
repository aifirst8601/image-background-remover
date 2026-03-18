import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DAILY_LIMIT_PER_IP = parseInt(process.env.DAILY_LIMIT_PER_IP || '3');
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

// In-memory rate limiting for development (use KV in production)
// When deploying to Cloudflare Pages, this will replaced by Cloudflare KV
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
      { error: 'Daily limit reached. Each IP can process up to 3 images per day. Please come back tomorrow.' },
      { status: 429 }
    );
  }

  if (!REMOVE_BG_API_KEY) {
    return NextResponse.json(
      { error: 'Remove.bg API key not configured. Please set REMOVE_BG_API_KEY environment variable.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Check file size
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
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
    removeBgForm.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
      body: removeBgForm,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ errors: [{ message: 'Unknown error' }] }));
      const errorMessage = errorData.errors?.[0]?.message || `API error: ${response.status}`;
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
