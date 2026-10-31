import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.handle,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#262626",
    theme_color: "#262626",
    categories: ["portfolio", "design", "development", "photography"],
    icons: [
      {
        src: "/assets/CK_Logo_White.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/assets/CK_Logo_White.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/CK_Logo_White.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
