import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ck0x.me"),
  title: {
    default: "Chintan Kukadiya | Frontend Developer & Video Editor",
    template: "%s | Chintan Kukadiya"
  },
  description: "Personal portfolio of Chintan Kukadiya (ck0x), a frontend developer and video editor based in Gujarat, India. Building clean, fast, and responsive web applications with React, Next.js, and TypeScript.",
  keywords: [
    "Chintan Kukadiya",
    "ck0x",
    "ck0xdev",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Video Editor",
    "Portfolio",
    "Gujarat",
    "India"
  ],
  authors: [{ name: "Chintan Kukadiya", url: "https://ck0x.me" }],
  creator: "Chintan Kukadiya",
  publisher: "Chintan Kukadiya",
  category: "technology",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://ck0x.me",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ck0x.me",
    title: "Chintan Kukadiya | Frontend Developer & Video Editor",
    description: "Personal portfolio of Chintan Kukadiya (ck0x). Frontend developer and video editor from Gujarat, India specializing in React, Next.js, and TypeScript.",
    siteName: "Chintan Kukadiya Portfolio",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "Chintan Kukadiya - Frontend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chintan Kukadiya | Frontend Developer & Video Editor",
    description: "Personal portfolio of Chintan Kukadiya (ck0x). Frontend developer and video editor from Gujarat, India.",
    creator: "@ck0x",
    images: ["/assets/hero.png"],
  },
  icons: {
    icon: "/assets/icon.png",
    apple: "/assets/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ck0x.me/#website",
      url: "https://ck0x.me",
      name: "Chintan Kukadiya Portfolio",
      description: "Frontend Developer & Video Editor based in Gujarat, India",
      publisher: {
        "@id": "https://ck0x.me/#person"
      },
      inLanguage: "en-US"
    },
    {
      "@type": "ProfilePage",
      "@id": "https://ck0x.me/#webpage",
      url: "https://ck0x.me",
      name: "Chintan Kukadiya | Frontend Developer & Video Editor",
      isPartOf: {
        "@id": "https://ck0x.me/#website"
      },
      about: {
        "@id": "https://ck0x.me/#person"
      },
      description: "Personal portfolio of Chintan Kukadiya (ck0x), a frontend developer and video editor based in Gujarat, India."
    },
    {
      "@type": "Person",
      "@id": "https://ck0x.me/#person",
      name: "Chintan Kukadiya",
      alternateName: "ck0x",
      url: "https://ck0x.me",
      image: "https://ck0x.me/assets/hero.png",
      jobTitle: "Frontend Developer & Video Editor",
      worksFor: {
        "@type": "Organization",
        name: "StudioX"
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Gujarat",
        addressCountry: "India"
      },
      sameAs: [
        "https://github.com/ck0xdev",
        "https://linkedin.com/in/ck0x",
        "https://discord.com/users/1389525213376544768"
      ],
      knowsAbout: [
        "Frontend Development",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "CSS",
        "HTML",
        "Video Editing",
        "UI/UX Design"
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caveat.variable} ${outfit.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="loading">{children}</body>
    </html>
  );
}
