# Free Image Background Remover

Free online image background removal, powered by Next.js, Tailwind CSS, and Remove.bg API. Deployable on Cloudflare Pages.

✨ **Features**
- 100% free for 3 images/day per IP
- No watermark on output
- No registration required
- Click, drag & drop, or paste from clipboard
- Responsive design – works on mobile and desktop
- Powered by AI for accurate background removal
- Cloudflare native deployment – low cost, globally fast

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Cloudflare Pages
- **AI Background Removal:** Remove.bg API
- **Rate Limiting:** Cloudflare KV (when deployed to Cloudflare, in-memory for development)

## Getting Started

### Prerequisites

- Node.js 18+
- Remove.bg API key (get one at [remove.bg/api](https://www.remove.bg/api))

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Remove.bg API key:

```
REMOVE_BG_API_KEY=your_api_key_here
ALLOWED_ORIGIN=*
DAILY_LIMIT_PER_IP=3
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Deploy to Cloudflare Pages

1. Push your code to GitHub
2. Connect your GitHub repo to Cloudflare Pages
3. Set build command to `npm run build`
4. Set output directory to `.next`
5. Add environment variables in Cloudflare Pages dashboard:
   - `REMOVE_BG_API_KEY` - your Remove.bg API key
   - `ALLOWED_ORIGIN` - your domain (e.g., `https://bgremove.yourdomain.com`)
   - `DAILY_LIMIT_PER_IP` - `3`
6. Deploy!

**Note:** Cloudflare Pages supports Next.js App Router natively now.

## Features Implemented

- ✅ Drag & drop upload
- ✅ Paste from clipboard
- ✅ File size / type validation
- ✅ Rate limiting by IP (3 images/day free)
- ✅ Transparent PNG output with checkerboard preview
- ✅ SEO optimized meta tags
- ✅ About, Privacy, Pricing pages
- ✅ Fully responsive design
- ✅ No watermark – core differentiation from other free tools
- ✅ No login required

## Project Structure

```
├── app/
│   ├── api/
│   │   └── remove-bg/
│   │       └── route.ts      # API endpoint for background removal
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── privacy/
│   │   └── page.tsx          # Privacy policy
│   ├── pricing/
│   │   └── page.tsx          # Pricing page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (upload and processing)
├── public/                   # Static assets
├── .env.example              # Environment variables example
├── _routes.json              # Cloudflare Pages routes
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## MVP Scope

This is a minimum viable product:
- Core feature: Upload → Remove Background → Download PNG
- Free tier: 3 images/day per IP
- No watermark, no login
- Cloudflare deployment for low cost
- Fast validation of product/market fit

## License

MIT
