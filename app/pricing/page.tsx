import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing - Free Image Background Remover",
  description: "Pricing for Free Image Background Remover. Free and premium plans available.",
};

export default function PricingPage() {
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

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="border rounded-xl p-8 bg-white dark:bg-gray-900 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Free</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Perfect for occasional use</p>
            <p className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                3 images per day
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Maximum 5MB file size
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                No watermarks
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                No sign up required
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Transparent PNG output
              </li>
            </ul>
            <Link
              href="/"
              className="block text-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-blue-600 rounded-xl p-8 bg-blue-50 dark:bg-blue-900/20 shadow-md">
            <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
              Coming Soon
            </div>
            <h2 className="text-2xl font-bold mb-2">Premium</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">For frequent users and professionals</p>
            <p className="text-4xl font-bold mb-6">$9.99<span className="text-lg font-normal text-gray-500">/month</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited images per month
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Maximum 25MB file size
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                No watermarks
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Faster processing
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Batch processing coming soon
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Priority support
              </li>
            </ul>
            <button
              disabled
              className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg opacity-50 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6 text-left">
            <div>
              <h4 className="font-semibold">Is the free plan really free?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! The free plan is 100% free forever. You get 3 images per day, no watermarks, no sign up required.
                We think this is perfect for most casual users.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">When will premium be available?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                We're currently testing the service with the free tier. Once we have enough users and feedback,
                we'll launch the premium plan with unlimited processing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Do you store my images?</h4>
              <p className="text-gray-600 dark:text-gray-400">
                No. We don't store your images after processing. Images are processed and then immediately discarded.
                Check out our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> for more details.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">← Back to home</Link>
        </p>
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
