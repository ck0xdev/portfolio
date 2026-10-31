"use client";

import { useEffect, useRef } from "react";
import { getSectionMessage } from "@/config/sections";

export interface SectionPendingModalProps {
  sectionName: string;
  onClose: () => void;
}

export default function SectionPendingModal({
  sectionName,
  onClose,
}: SectionPendingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const message = getSectionMessage(sectionName);

  useEffect(() => {
    // 1. Remember previously focused element to return focus on close
    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;

    // 2. Prevent background scrolling without layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3. Focus trap & initial focus
    const modal = modalRef.current;
    if (modal) {
      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    // 4. Keyboard handlers: Escape to close & Tab cycle
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && modal) {
        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      // Restore scroll and body padding
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      // Cleanly blur trigger so no outline box remains
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.blur();
      }
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pending-modal-title"
      aria-describedby="pending-modal-description"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dimmed backdrop with smooth fade */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-[540px] rounded-2xl border border-white/15 bg-[#1f1f1f]/95 p-8 sm:p-9 pb-7 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-200 motion-safe:animate-[modalScaleIn_0.2s_ease-out] motion-reduce:animate-none"
      >
        {/* Header: Status dot + mono label + close button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-full bg-[#ff2d55]"
              style={{ boxShadow: "0 0 8px rgba(255, 45, 85, 0.7)" }}
            />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-300">
              UNDER ACTIVE CURATION
            </span>
          </div>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClose}
            aria-label="Close dialog"
            className="group flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-95 cursor-pointer"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ✕
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="py-7">
          <h2
            id="pending-modal-title"
            className="mb-4 text-2xl sm:text-[1.75rem] font-light tracking-tight text-white leading-normal"
          >
            Crafting the{" "}
            <span className="font-semibold text-white underline decoration-white/40 underline-offset-8">
              {sectionName}
            </span>{" "}
            Section
          </h2>

          <p
            id="pending-modal-description"
            className="text-sm sm:text-base font-light text-neutral-300 leading-relaxed"
          >
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-400">
            CK0X · PORTFOLIO
          </span>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClose}
            className="rounded-full border border-white/25 bg-white/5 px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-[#262626] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95 cursor-pointer shadow-sm"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
