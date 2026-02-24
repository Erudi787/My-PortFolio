import { FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[#043CAA]/10 rounded-full">
            <FileQuestion size={48} className="text-[#043CAA]" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-[#043CAA] mb-2">404</h1>

        <h2 className="text-2xl font-bold text-[#070B0C] mb-3">
          Page Not Found
        </h2>

        <p className="text-[#575454] mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#043CAA] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#043CAA]/90 transition-colors"
          >
            <Home size={18} />
            Go Home
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 bg-gray-200 text-[#070B0C] px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
