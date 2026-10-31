import { siteConfig } from "@/config/site";

export default function JsonLd() {
  const personSchema = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: [
      siteConfig.handle,
      siteConfig.shortHandle,
      "0x",
      "x",
      "ck0xdev",
      "ck0xDev",
      "Chintan",
      "Kukadiya",
      "ChintanKukadiya",
    ],
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    nationality: {
      "@type": "Country",
      name: "India",
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Gujarat",
      addressCountry: "India",
    },
    sameAs: [
      siteConfig.socials.linkedin,
      siteConfig.socials.github,
      siteConfig.socials.discord,
      siteConfig.socials.twitter,
      siteConfig.socials.instagram,
      siteConfig.alternateUrl,
    ].filter(Boolean),
    knowsAbout: [
      "Web Design",
      "Frontend Development",
      "Creative Engineering",
      "Video Editing",
      "Cinematic Storytelling",
      "Photography",
      "UI/UX Design",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion Design",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Creative Developer",
        occupationalCategory: "15-1252.00",
        skills: "Web Design, React, Next.js, Frontend Architecture",
      },
      {
        "@type": "Occupation",
        name: "Video Editor & Visual Storyteller",
        occupationalCategory: "27-4032.00",
        skills: "Cinematic Video Editing, Color Grading, Motion Graphics",
      },
    ],
  };

  const webSiteSchema = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.title,
    alternateName: [
      "ck0x Portfolio",
      "ck Portfolio",
      "Chintan Kukadiya Portfolio",
      "ck0x.me",
      "ck0xdev",
    ],
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@id": `${siteConfig.url}/#person`,
    },
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
  };

  const profilePageSchema = {
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    name: `${siteConfig.name} (${siteConfig.handle}) Portfolio`,
    description: siteConfig.description,
    inLanguage: "en-US",
    dateCreated: "2024-01-01T00:00:00+05:30",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@id": `${siteConfig.url}/#person`,
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personSchema, webSiteSchema, profilePageSchema],
  };

  // Safe JSON serialization escaping '<' to prevent XSS script injection
  const safeJsonStringify = (data: unknown) =>
    JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonStringify(structuredData) }}
    />
  );
}
