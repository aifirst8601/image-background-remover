# Local Deployment Guide

This branch is configured for **local server deployment** with Next.js.

## Configuration Features

### Next.js Config (`next.config.ts`)
- No `output: "export"` - Uses dynamic server
- `.next` build directory
- Cache enabled for faster builds

### API Routes
- `/api/remove-bg` - Server-side API endpoint
- Rate limiting implemented
- Environment variable support

### Environment Variables
Create `.env.local` file:
```env
REMOVE_BG_API_KEY=your_api_key_here
DAILY_LIMIT_PER_IP=3
ALLOWED_ORIGIN=http://localhost:3000
```

## Local Development

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup
```bash
# Clone repository
git clone https://github.com/aifirst8601/image-background-remover.git
cd image-background-remover

# Switch to local branch
git checkout local

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your remove.bg API key

# Start development server
pnpm dev
```

### Production Build
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## API Endpoints

### `POST /api/remove-bg`
**Description**: Remove background from an image

**Request**:
- Method: `POST`
- Content-Type: `multipart/form-data`
- Form field: `image` (required) - Image file

**Response**:
- Success: `200 OK` with PNG image
- Rate limit: `429 Too Many Requests`
- File size: `400 Bad Request` if > 5MB

## Features
- ✅ Server-side API routing
- ✅ Rate limiting (3 requests per IP per day)
- ✅ Environment variable support
- ✅ CORS support
- ✅ File size validation (5MB limit)

## Deployment Options
1. **Local development**: `pnpm dev`
2. **Local production**: `pnpm build && pnpm start`
3. **Docker**: Use with proper volume mounts
4. **VPS/Cloud Server**: Deploy with PM2 or systemd

## Security Notes
- API key is stored in environment variables (secure)
- Rate limiting protects against abuse
- File size validation prevents large uploads