"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Runtime exception caught by Error Boundary:", error);
    }
  }, [error]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#262626] px-6 select-none">
      {/* 35mm Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none grain-overlay opacity-80 mix-blend-overlay"
      />

      {/* Ambient Radial Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] rounded-full bg-[#ff2d55]/[0.05] blur-3xl" />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
        {/* Pulsing Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ff2d55]/30 bg-[#ff2d55]/10 px-3.5 py-1 mb-4 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2d55] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff2d55]" />
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#ff2d55]">
            Runtime Exception
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-3.5 leading-tight">
          An Unexpected Event Occurred
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base font-light text-neutral-400 leading-relaxed mb-7 max-w-sm sm:max-w-md">
          The application encountered an unexpected boundary condition. No data was compromised.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={() => reset()}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/[0.08] backdrop-blur-md px-7 py-2.5 sm:px-8 sm:py-3 text-xs font-mono uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#262626] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="text-sm transition-transform duration-300 group-hover:rotate-180">
              ↻
            </span>
            <span className="tracking-[0.2em] -mr-[0.2em]">Reattempt Render</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md px-6 py-2.5 sm:px-7 sm:py-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 transition-all duration-300 hover:border-white/40 hover:text-white hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95 shadow-sm"
          >
            <span className="tracking-[0.2em] -mr-[0.2em]">Home</span>
          </Link>
        </div>
      </div>

      {/* Coordinate & System Telemetry Footer */}
      <div className="absolute bottom-6 sm:bottom-8 z-10 flex items-center justify-between w-full max-w-2xl px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        <span>SAFE_MODE: ON</span>
        <span>ck0x · System Safe Mode</span>
        <span className="hidden sm:inline">RECOVERY: READY</span>
      </div>
    </div>
  );
}
