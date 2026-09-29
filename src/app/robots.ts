import type { MetadataRoute } from "next";

import { absoluteSiteUrl } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Yandex",
        allow: "/",
        other: {
          "Clean-param":
            "utm_source&utm_medium&utm_campaign&utm_content&utm_term&yclid&ysclid&etext&from",
        },
      },
    ],
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}
