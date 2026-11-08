import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** /robots.txt, generated at build time. The CMS (/admin) is kept out of search. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
