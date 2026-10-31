"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SECTIONS, getSectionConfig } from "@/config/sections";
import SectionPendingModal from "@/components/SectionPendingModal";
import MobileSidebar from "@/components/MobileSidebar";
import ComplianceModal from "@/components/ComplianceModal";

interface NavLinkProps {
  section: { name: string };
  onClick: (name: string) => void;
}

function NavLink({ section, onClick }: NavLinkProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => {
        (e.currentTarget as HTMLButtonElement)?.blur();
        onClick(section.name);
      }}
      className="group relative py-1 text-sm font-semibold tracking-wide text-neutral-400 transition-colors duration-200 hover:text-white outline-none focus:outline-none focus-visible:outline-none select-none cursor-pointer"
    >
      <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
        {section.name}
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-center scale-x-0 rounded-full bg-white/90 transition-transform duration-250 ease-out group-hover:scale-x-100"
      />
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [pendingSectionName, setPendingSectionName] = useState<string | null>(
    null
  );

  // Automatically clean up any existing hash (#projects, #about, etc.) from the URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const leftSections = SECTIONS.filter((s) => s.position === "left");
  const rightSections = SECTIONS.filter((s) => s.position === "right");

  const handleNavClick = (sectionName: string) => {
    const config = getSectionConfig(sectionName);
    if (!config) return;

    if (config.pending) {
      setPendingSectionName(config.name);
      setIsOpen(false);
    } else {
      // Smooth scroll to section without adding # hash to the URL
      const element = document.getElementById(config.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <div
          className="pointer-events-auto relative flex w-[85%] items-center justify-between"
          style={{ height: "80px" }}
        >
          {/* Left Side Links */}
          <nav
            aria-label="Left Navigation"
            className="hidden md:flex flex-1 items-center justify-start gap-8 lg:gap-11"
          >
            {leftSections.map((section) => (
              <NavLink key={section.name} section={section} onClick={handleNavClick} />
            ))}
          </nav>

          {/* Center: Logo with subtle spring scale on hover */}
          <div className="flex items-center justify-center shrink-0 px-4">
            <Link
              href="/"
              className="group flex items-center transition-transform duration-300 ease-out hover:scale-105 active:scale-95 outline-none focus:outline-none focus-visible:outline-none"
              aria-label="Home"
            >
              <Image
                src="/assets/CK_Logo_White.png"
                alt="Chintan Kukadiya (ck0x) Studio Monogram Logo"
                width={48}
                height={48}
                className="h-10 sm:h-11 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                style={{ width: "auto" }}
                priority
              />
            </Link>
          </div>

          {/* Right Side Links */}
          <nav
            aria-label="Right Navigation"
            className="hidden md:flex flex-1 items-center justify-end gap-8 lg:gap-11"
          >
            {rightSections.map((section) => (
              <NavLink key={section.name} section={section} onClick={handleNavClick} />
            ))}
          </nav>

          {/* Mobile Menu Button - Transparent Background */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              (e.currentTarget as HTMLButtonElement)?.blur();
              setIsOpen(true);
            }}
            className="md:hidden flex items-center gap-2 rounded-full bg-transparent px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 transition-all duration-200 hover:text-white active:scale-95 outline-none focus:outline-none focus-visible:outline-none cursor-pointer"
            aria-expanded={isOpen}
            aria-label="Open navigation menu"
          >
            <div className="flex flex-col gap-1 w-3">
              <span className="h-[1.5px] w-full bg-current rounded-full" />
              <span className="h-[1.5px] w-2 bg-current rounded-full self-end" />
            </div>
            <span>Menu</span>
          </button>
        </div>
      </header>

      {/* Slide-in Luxury Mobile Sidebar Drawer */}
      <MobileSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectSection={handleNavClick}
        onOpenCompliance={() => setIsComplianceOpen(true)}
      />

      {/* Reusable Section Under Curation Modal */}
      {pendingSectionName && (
        <SectionPendingModal
          sectionName={pendingSectionName}
          onClose={() => setPendingSectionName(null)}
        />
      )}

      {/* Statutory Privacy & DPDPA Compliance Modal */}
      <ComplianceModal
        isOpen={isComplianceOpen}
        onClose={() => setIsComplianceOpen(false)}
      />
    </>
  );
}
