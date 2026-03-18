import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Image Background Remover - Remove BG Online No Watermark",
  description: "Free online image background remover. Remove background from any image, get transparent PNG. 100% free, no watermark, no sign up required.",
  keywords: "free image background remover, remove bg from image, transparent png, no watermark, remove background online, free background remover",
  openGraph: {
    title: "Free Image Background Remover - Remove BG Online No Watermark",
    description: "Free online image background remover. Remove background from any image, get transparent PNG. 100% free, no watermark, no sign up required.",
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
