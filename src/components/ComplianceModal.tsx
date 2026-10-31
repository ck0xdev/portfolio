"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";

const emptySubscribe = () => () => {};

function ProtectedContactEmail() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <span className="font-mono text-[11px] text-neutral-500">
        [Protected against automated scraping]
      </span>
    );
  }

  const user = "ck0x.work";
  const domain = "gmail.com";
  const address = `${user}@${domain}`;

  return (
    <a
      href={`mailto:${address}`}
      className="text-white underline underline-offset-2 hover:text-neutral-200"
    >
      {address}
    </a>
  );
}

export interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComplianceModal({
  isOpen,
  onClose,
}: ComplianceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compliance-modal-title"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Dialog Card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-[620px] max-h-[85vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#1b1b1b]/95 p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-200 motion-safe:animate-[modalScaleIn_0.2s_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-full bg-emerald-400"
              style={{ boxShadow: "0 0 8px rgba(52, 211, 153, 0.8)" }}
            />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
              PRIVACY & STATUTORY COMPLIANCE
            </span>
          </div>

          <button
            type="button"
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
        <div className="py-6 space-y-5 text-sm text-neutral-300 font-light leading-relaxed">
          <div>
            <h2
              id="compliance-modal-title"
              className="text-xl sm:text-2xl font-normal text-white tracking-tight mb-2"
            >
              Data Protection & Privacy Notice
            </h2>
            <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
              Compliant with Digital Personal Data Protection Act, 2023 (DPDP Act) & IT Act, 2000
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              1. Zero-Tracking Guarantee
            </h3>
            <p className="text-xs text-neutral-300">
              This website operates on a <strong>cookie-less, privacy-first architecture</strong>. We do not use third-party analytics, tracking pixels, persistent cookies, fingerprinting scripts, or cross-site behavioral monitoring.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              2. Voluntary Communication & Consent (DPDPA Section 5 & 6)
            </h3>
            <p className="text-xs text-neutral-300">
              Any personal data you provide (such as your name and email address when contacting via email) is collected purely on a voluntary basis for the sole purpose of responding to your inquiry. We never sell, rent, monetize, or disclose your personal data to any third party.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              3. Data Principal Rights (DPDPA Section 11, 12, 13)
            </h3>
            <p className="text-xs text-neutral-300">
              Under India&apos;s DPDP Act 2023, you have the right to request access to your personal data, seek correction or erasure, withdraw consent at any time, and request grievance redressal.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              4. Statutory Grievance Redressal (DPDPA Section 8(10) & IT Rules)
            </h3>
            <div className="text-xs text-neutral-300 space-y-1">
              <p><strong>Grievance Officer:</strong> {siteConfig.compliance.dataProtectionOfficer}</p>
              <p><strong>Grievance Email:</strong> <ProtectedContactEmail /></p>
              <p><strong>Jurisdiction:</strong> {siteConfig.compliance.jurisdiction}</p>
              <p><strong>Statutory SLA:</strong> All grievances are acknowledged within 48 hours and resolved within 30 days in strict accordance with Indian law.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            CERT-IN & DPDP ACT CERTIFIED
          </span>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/25 bg-white/10 px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-[#262626] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95 cursor-pointer shadow-sm"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}

