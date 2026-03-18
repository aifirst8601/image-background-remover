'use client';

import { useState, useRef, useCallback } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    setProcessedImage(null);
    setProgress(0);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPG and PNG files are allowed');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB for free users');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          handleFile(file);
        }
        break;
      }
    }
  }, [handleFile]);

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const removeBackground = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setError(null);
    setProgress(10);

    try {
      // Convert data URL to Blob
      const response = await fetch(originalImage);
      const blob = await response.blob();
      const file = new File([blob], 'image.' + blob.type.split('/')[1], { type: blob.type });

      const formData = new FormData();
      formData.append('image', file);

      setProgress(30);

      const apiResponse = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!apiResponse.ok) {
        const data = await apiResponse.json();
        throw new Error(data.error || 'Failed to process image');
      }

      const processedBlob = await apiResponse.blob();
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);
      setProgress(100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = 'background-removed.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetAll = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Free Image Background Remover
          </h1>
          <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
            Remove background from any image online • 100% free • No watermark • No sign up required
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Upload Area */}
        {!originalImage && (
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 md:p-16 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png"
              className="hidden"
            />
            <div className="text-6xl mb-4">🖼️</div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Click or drag and drop your image here
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Or press Ctrl+V to paste from clipboard
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              JPG or PNG • Max 5MB • Free • No watermark
            </p>
          </div>
        )}

        {/* Original Preview & Processing */}
        {originalImage && !processedImage && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Original Image</h3>
                <div className="rounded-lg overflow-hidden shadow-md inline-block">
                  <img src={originalImage} alt="Original" className="max-w-full h-auto max-h-[400px]" />
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <p className="mb-3 text-blue-800 dark:text-blue-200">Processing your image...</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={removeBackground}
                disabled={isProcessing}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Remove Background'}
              </button>
              <button
                onClick={resetAll}
                disabled={isProcessing}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 font-semibold rounded-lg transition-colors"
              >
                Upload New Image
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {processedImage && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Original</h3>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img src={originalImage!} alt="Original" className="max-w-full h-auto" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Result (Transparent Background)</h3>
                <div className="rounded-lg overflow-hidden shadow-md checkerboard p-4 inline-block">
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="max-w-full h-auto"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={downloadImage}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                Download PNG
              </button>
              <button
                onClick={resetAll}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 font-semibold rounded-lg transition-colors"
              >
                Process Another Image
              </button>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            Free Online Background Remover – Get Transparent PNG Instantly
          </h2>
          <p>
            Our free background remover tool lets you remove the background from any image quickly and easily.
            No software to install, no sign up required, and absolutely no watermarks on your output.
            Whether you're a photographer, e-commerce seller, or just need to edit a photo for social media,
            our tool gives you professional-quality results in seconds.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-3">Features</h3>
          <ul>
            <li><strong>100% Free:</strong> Remove background from images for free, no hidden fees</li>
            <li><strong>No Watermark:</strong> Unlike other free tools, we don't add any watermarks to your images</li>
            <li><strong>No Sign Up:</strong> Start removing backgrounds right away, no account needed</li>
            <li><strong>High Quality:</strong> Powered by Remove.bg AI technology for accurate edge detection</li>
            <li><strong>Transparent PNG:</strong> Get a clean transparent background ready to use anywhere</li>
            <li><strong>Works Everywhere:</strong> Mobile friendly, works on any device – phone, tablet, or computer</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">
            How to Remove Background from Image for Free
          </h3>
          <ol>
            <li>Upload your image by clicking, dragging, or pasting from clipboard</li>
            <li>Click the "Remove Background" button</li>
            <li>Wait a few seconds for AI processing</li>
            <li>Download your new transparent PNG image</li>
          </ol>

          <p>
            Perfect for product photos for your online store, profile pictures, portraits, graphic design projects,
            and more. Get a clean transparent background that you can use anywhere.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Free Image Background Remover • Free online tool • Built with Next.js and Cloudflare
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/about" className="hover:underline">About</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/pricing" className="hover:underline">Pricing</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
