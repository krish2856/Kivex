import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Kivex Technology",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5EFE5] flex flex-col justify-between selection:bg-[#2D5FC7] selection:text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#2D5FC7]/10 blur-[150px] pointer-events-none" />
      
      {/* Navigation Header */}
      <header className="border-b border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-md relative z-10">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-widest uppercase hover:opacity-85 transition-opacity"
          >
            KIVEX
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/20"
          >
            ← Return to Home
          </Link>
        </div>
      </header>

      {/* Main 404 Hero */}
      <main className="relative z-10 mx-auto max-w-2xl px-6 py-20 text-center flex flex-col items-center justify-center my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B62A]/10 border border-[#E8B62A]/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#E8B62A]">
            ERROR 404
          </span>
        </div>

        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-white mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5EFE5] mb-3">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base text-[#A3A3A3] max-w-md mx-auto mb-10 leading-relaxed">
          The requested system route does not exist, has been archived, or was moved to another endpoint.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#2D5FC7] hover:bg-[#4A7AE8] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#2D5FC7]/25 text-center cursor-pointer"
          >
            Back to Home
          </Link>

          <Link
            href="/#work"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold text-sm transition-all duration-300 text-center cursor-pointer"
          >
            View Our Work
          </Link>

          <Link
            href="/#contact"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#E8B62A]/15 hover:bg-[#E8B62A]/25 border border-[#E8B62A]/30 text-[#E8B62A] font-semibold text-sm transition-all duration-300 text-center cursor-pointer"
          >
            Start a Project →
          </Link>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="border-t border-white/[0.08] py-6 text-center text-xs text-white/40 relative z-10">
        &copy; {new Date().getFullYear()} Kivex Technology. Building Digital Systems That Move Businesses Forward.
      </footer>
    </div>
  );
}
