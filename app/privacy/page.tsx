import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Free Image Background Remover",
  description: "Privacy Policy for Free Image Background Remover.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Free Image Background Remover
            </Link>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>Last updated: March 18, 2026</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Overview</h2>
          <p>
            We respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you how we look after your personal data when
            you visit our website and tell you about your privacy rights.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">What Data We Collect</h2>
          <ul>
            <li>We do not require you to create an account or provide personal information</li>
            <li>Your uploaded images are only processed to remove the background and are not stored on our servers after processing</li>
            <li>We use basic rate limiting by IP address to prevent abuse of our free service</li>
            <li>IP addresses are not stored permanently, rate limit counters expire after 24 hours</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Third Party Services</h2>
          <p>
            We use the Remove.bg API to process your images and remove backgrounds.
            When you upload an image, it is sent to Remove.bg for processing.
            Please refer to Remove.bg's privacy policy for more information about how they handle your data.
          </p>

          <p>
            If we display advertisements, third-party advertisers may collect and use cookies
            and similar technologies to collect data for personalized advertising.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Cookies</h2>
          <p>
            We do not use essential cookies for basic functionality.
            If we add analytics or advertising in the future, those may use cookies.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
          <p>
            Since we don't store any of your personal data permanently, there is no data we need to provide you with
            upon request. All rate limiting data is automatically deleted after 24 hours.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. The latest version will always be available on this page.
          </p>

          <p className="mt-8">
            <Link href="/" className="text-blue-600 hover:underline">← Back to home</Link>
          </p>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 pt-8 border-t text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Free Image Background Remover • Free online tool • Built with Next.js and Cloudflare
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
        </div>
      </footer>
    </div>
  );
}
