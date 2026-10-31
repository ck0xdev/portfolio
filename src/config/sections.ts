export interface SectionConfig {
  id: string;
  name: string;
  href: string;
  pending: boolean;
  message?: string;
  position: "left" | "right";
}

export const DEFAULT_PENDING_MESSAGE =
  "This section is being refined to production quality. Fresh work and details will be live here soon.";

/**
 * PENDING SECTIONS CONFIGURATION (Single Source of Truth)
 *
 * To mark any section as live:
 * Set `pending: false` for that section.
 * When pending is false, clicking its nav link will navigate to its href.
 */
export const SECTIONS: SectionConfig[] = [
  {
    id: "about",
    name: "About",
    href: "#about",
    pending: true,
    message: "My story, timeline, and approach are being refined. Coming soon.",
    position: "left",
  },
  {
    id: "experience",
    name: "Experience",
    href: "#experience",
    pending: true,
    position: "left",
  },
  {
    id: "project",
    name: "Project",
    href: "#projects",
    pending: true,
    message: "Case studies are being finalized with full process and results. Coming soon.",
    position: "left",
  },
  {
    id: "work",
    name: "Work",
    href: "#work",
    pending: true,
    position: "right",
  },
  {
    id: "contact",
    name: "Contact",
    href: "#contact",
    pending: true,
    message: "A better way to reach me is being built. Coming soon.",
    position: "right",
  },
  {
    id: "store",
    name: "Store",
    href: "#store",
    pending: true,
    position: "right",
  },
];

export function getSectionConfig(nameOrId: string): SectionConfig | undefined {
  const query = nameOrId.toLowerCase().trim();
  return SECTIONS.find(
    (s) => s.id.toLowerCase() === query || s.name.toLowerCase() === query
  );
}

export function getSectionMessage(nameOrId: string): string {
  const config = getSectionConfig(nameOrId);
  return config?.message || DEFAULT_PENDING_MESSAGE;
}

