"use client";

import { useEffect } from "react";
import { SECTIONS } from "@/config/sections";

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionName: string) => void;
  onOpenCompliance?: () => void;
}

export default function MobileSidebar({
  isOpen,
  onClose,
  onSelectSection,
  onOpenCompliance,
}: MobileSidebarProps) {
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className={`fixed inset-0 z-[100] ${
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-500 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-10 flex flex-col items-center justify-center w-full sm:max-w-[360px] bg-[#161616]/95 backdrop-blur-2xl border-l border-white/[0.08] shadow-[0_0_80px_rgba(0,0,0,0.85)] transition-transform duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Tactile 35mm matte film grain overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grain-overlay opacity-50 mix-blend-overlay"
        />

        {/* Minimal Close Button */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white active:scale-90 cursor-pointer outline-none focus:outline-none focus-visible:outline-none"
        >
          <svg
            className="h-4 w-4 transition-transform duration-300 hover:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── Centered Navigation Links (Vertical & Horizontal) ── */}
        <nav
          aria-label="Mobile Navigation"
          className="relative z-10 flex flex-col items-center justify-center w-full px-8 gap-7 sm:gap-8"
        >
          {SECTIONS.map((section, index) => (
            <button
              key={section.name}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                (e.currentTarget as HTMLButtonElement).blur();
                onSelectSection(section.name);
              }}
              className="group relative text-center select-none cursor-pointer outline-none focus:outline-none"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 380ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 45 + 80}ms, transform 380ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 45 + 80}ms`,
              }}
            >
              <span className="block text-2xl sm:text-3xl font-light tracking-wide text-neutral-300 transition-all duration-300 group-hover:text-white group-hover:scale-105 active:scale-95">
                {section.name}
              </span>
              <span
                aria-hidden="true"
                className="mx-auto mt-1.5 block h-[1.5px] w-0 bg-white/70 transition-all duration-300 ease-out group-hover:w-8"
              />
            </button>
          ))}
        </nav>

        {/* Statutory Compliance Link */}
        {onOpenCompliance && (
          <div className="absolute bottom-8 z-10 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCompliance();
              }}
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/20"
            >
              Privacy & DPDP Compliance
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}


