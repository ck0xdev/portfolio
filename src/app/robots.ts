import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/+$/, "");

  return {
    rules: [
      // 1. Legitimate search engines allowed for SEO indexing
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "YandexBot", "Baiduspider"],
        allow: "/",
      },
      // 2. Disallow aggressive AI scrapers, data harvesters, and commercial bots
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "ClaudeBot",
          "Claude-Web",
          "Bytespider",
          "PetalBot",
          "DataForSeoBot",
          "Scrapy",
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "Amazonbot",
        ],
        disallow: "/",
      },
      // 3. General catch-all for standard web browsers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
