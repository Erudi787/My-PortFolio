'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <AlertTriangle size={48} className="text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#070B0C] mb-3">
          Something went wrong
        </h1>

        <p className="text-[#575454] mb-6">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-sm font-mono text-red-600 break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-[#043CAA] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#043CAA]/90 transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-200 text-[#070B0C] px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
