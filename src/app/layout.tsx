import type { Metadata } from "next";
import { Caveat, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ck0x.me"),
  title: "ck0x | Premium Frontend Developer",
  description: "A premium, interactive frontend portfolio showcasing advanced web development, immersive animations, and beautiful UI/UX experiences.",
  keywords: ["Frontend Developer", "React", "Next.js", "Portfolio", "UI/UX", "GSAP", "Web Design", "Tailwind CSS"],
  authors: [{ name: "ck0x" }],
  creator: "ck0x",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ck0x.me", 
    title: "ck0x | Premium Frontend Developer",
    description: "A premium, interactive frontend portfolio showcasing advanced web development and beautiful UI/UX experiences.",
    siteName: "ck0x Portfolio",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "ck0x Portfolio Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ck0x | Premium Frontend Developer",
    description: "A premium, interactive frontend portfolio showcasing advanced web development and beautiful UI/UX experiences.",
    images: ["/assets/hero.png"],
  },
  icons: {
    icon: '/assets/icon.png',
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${caveat.variable} ${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="loading">{children}</body>
    </html>
  );
}
