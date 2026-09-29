import type { MetadataRoute } from "next";

import { absoluteSiteUrl } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteSiteUrl("/"),
      lastModified: new Date("2026-09-29"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteSiteUrl("/privacy/"),
      lastModified: new Date("2026-09-29"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
