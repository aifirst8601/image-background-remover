import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Free Image Background Remover",
  description: "Learn more about our free online background remover tool.",
};

export default function AboutPage() {
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
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>
            We built this free background remover tool to give everyone access to high-quality background removal
            without the watermarks, forced sign-ups, and high prices that other tools charge.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is simple: provide a fast, free, and easy-to-use tool that just works.
            We believe that basic image editing should be accessible to everyone, regardless of budget.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Use Our Tool?</h2>
          <ul>
            <li><strong>No watermarks:</strong> Your finished image is yours to use, we don't ruin it with our watermark</li>
            <li><strong>No registration:</strong> Start using the tool immediately, no need to create an account</li>
            <li><strong>Free:</strong> 3 free images per day for every user, forever</li>
            <li><strong>AI powered:</strong> Accurate background removal with state-of-the-art AI</li>
            <li><strong>Privacy focused:</strong> We delete your images after processing, we don't store them</li>
          </ul>

          <p>
            If you like our tool and need more than 3 images per day, you can upgrade to our premium plan in the future.
            But we will always keep the free tier available for everyone.
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
