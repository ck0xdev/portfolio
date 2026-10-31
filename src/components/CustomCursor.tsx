"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is purely a mobile smartphone/tablet (iOS, Android mobile)
    const isMobileUserAgent =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // If pure mobile user-agent with coarse touch only and no hover capability
    if (
      isMobileUserAgent &&
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(hover: hover)").matches
    ) {
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!cursor || !ring || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let isVisible = false;
    let isHovering = false;
    let isClicking = false;

    const updateStyles = () => {
      if (!ring || !dot) return;

      if (isClicking) {
        ring.style.transform = "scale(0.85)";
        ring.style.borderColor = "rgba(255, 255, 255, 0.85)";
        dot.style.opacity = "0.7";
        dot.style.transform = "scale(0.7)";
      } else if (isHovering) {
        // Sleek interactive state: Dot fades out so it NEVER blocks text,
        // ring subtly expands with crisp hairline border and ZERO blur or milky fill
        ring.style.transform = "scale(1.35)";
        ring.style.borderColor = "rgba(255, 255, 255, 0.65)";
        dot.style.opacity = "0";
        dot.style.transform = "scale(0)";
      } else {
        // Neutral default state: Perfect concentric alignment, crystal-clear transparency
        ring.style.transform = "scale(1)";
        ring.style.borderColor = "rgba(255, 255, 255, 0.32)";
        dot.style.opacity = "1";
        dot.style.transform = "scale(1)";
      }
    };

    // Initialize initial styles
    updateStyles();

    let rafPending = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = "1";
        document.documentElement.classList.add("custom-cursor-active");
      }

      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
          rafPending = false;
        });
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      const isInteractive =
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest(".hover-target") ||
          target.closest(".cursor-pointer"));

      if (Boolean(isInteractive) !== isHovering) {
        isHovering = Boolean(isInteractive);
        updateStyles();
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      updateStyles();
    };

    const onMouseUp = () => {
      isClicking = false;
      updateStyles();
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      cursor.style.opacity = "1";
      document.documentElement.classList.add("custom-cursor-active");
    };

    // If user touches the screen, hide cursor
    const onTouchStart = () => {
      isVisible = false;
      cursor.style.opacity = "0";
      document.documentElement.classList.remove("custom-cursor-active");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999] opacity-0 transition-opacity duration-200"
      style={{ willChange: "transform" }}
    >
      {/* Outer hairline ring: 28px diameter */}
      <div
        ref={ringRef}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-transparent transition-[transform,border-color] duration-200 ease-out"
      >
        {/* Inner precision dot */}
        <div
          ref={dotRef}
          className="h-1.5 w-1.5 rounded-full bg-[#ff2d55] transition-[transform,opacity] duration-200 ease-out shadow-[0_0_6px_rgba(255,45,85,0.6)]"
        />
      </div>
    </div>
  );
}
