"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [show, setShow] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [contentFadeOut, setContentFadeOut] = useState(false);

  useEffect(() => {
    // Check if website was already preloaded in this tab's session
    const hasPreloaded = sessionStorage.getItem("ck0x_preloaded");

    if (hasPreloaded === "true") {
      queueMicrotask(() => setShow(false));
      return;
    }

    // First visit in this tab: trigger preloader
    queueMicrotask(() => setShow(true));

    const startTime = performance.now();
    const duration = 2200; // 2.2 seconds: unhurried, elegant, and cinematic
    let animationFrameId: number;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Smooth cubic deceleration easing
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easedRatio = easeOutCubic(progressRatio);

      const current = Math.floor(easedRatio * 100);
      setProgress(current);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        // Mark as preloaded so reloads in this tab load instantly
        sessionStorage.setItem("ck0x_preloaded", "true");

        // Poised pause at 100%
        timeouts.push(
          setTimeout(() => {
            setContentFadeOut(true);

            // Curtain smoothly sweeps up into the ceiling
            timeouts.push(
              setTimeout(() => {
                setIsExiting(true);
                timeouts.push(
                  setTimeout(() => {
                    setShow(false);
                  }, 850)
                );
              }, 150)
            );
          }, 250)
        );
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Return nothing if already loaded in this tab
  if (show !== true) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99990] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        backgroundColor: "#000000",
        transform: isExiting ? "translateY(-100%)" : "translateY(0%)",
        transition: isExiting
          ? "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
        willChange: "transform",
      }}
    >
      {/* 35mm Tactile Grain Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none grain-overlay"
        style={{
          opacity: 0.65,
          mixBlendMode: "overlay",
        }}
      />

      {/* Elegant Centerpiece Container */}
      <div
        className="relative z-10 flex flex-col items-center transition-all duration-300 ease-out"
        style={{
          opacity: contentFadeOut ? 0 : 1,
          transform: contentFadeOut ? "translateY(-14px)" : "translateY(0px)",
        }}
      >
        {/* Brand Mark with subtle luminous presence */}
        <div className="relative flex items-center justify-center mb-7">
          <Image
            src="/assets/CK_Logo_White.png"
            alt="Chintan Kukadiya (ck0x) Monogram"
            width={52}
            height={52}
            className="h-11 sm:h-12 w-auto object-contain transition-opacity duration-300"
            style={{
              filter: "drop-shadow(0 0 25px rgba(255, 255, 255, 0.25))",
            }}
            priority
          />
        </div>

        {/* Crisp Hairline 1px Progress Line */}
        <div className="w-48 sm:w-56 h-[1px] bg-white/15 overflow-hidden rounded-full">
          <div
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 12px rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>

        {/* Minimalist Monospace Metric & Studio Status in Snow White */}
        <div className="mt-4 flex items-center justify-between w-48 sm:w-56 px-0.5">
          <span
            className="text-[11px] font-mono tracking-[0.2em] font-medium tabular-nums"
            style={{ color: "#ffffff", textShadow: "0 0 10px rgba(255, 255, 255, 0.4)" }}
          >
            {String(progress).padStart(2, "0")}%
          </span>
          <span
            className="text-[10px] font-mono uppercase tracking-[0.22em] font-light"
            style={{ color: "#ffffff", opacity: 0.9 }}
          >
            ck0x · 2026
          </span>
        </div>
      </div>
    </div>
  );
}
