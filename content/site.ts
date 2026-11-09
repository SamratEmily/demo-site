import type { SiteConfig } from "@/lib/types";
// Relative import: the Pages Functions (CMS login) bundle this file with
// Wrangler, which doesn't know the "@/" alias.
import settings from "./settings.json";

/**
 * The live site's address, from content/settings.json (CMS: Site settings →
 * Website address). Every absolute URL (canonical, Open Graph,
 * sitemap, JSON-LD, CMS login) is built from it. It must match the URLs in
 * public/admin/config.yml; next.config.ts checks that at build time.
 */
function siteOrigin(value: unknown): string {
  const url = typeof value === "string" ? URL.parse(value.trim()) : null;
  if (!url || url.protocol !== "https:" || url.pathname !== "/" || url.search || url.hash) {
    throw new Error(
      'content/settings.json: "site.url" must be the site\'s address, like https://example.com (no path).',
    );
  }
  return url.origin;
}

export const site: SiteConfig = {
  name: "Beacon Soft Ltd.",
  url: siteOrigin(settings.site.url),
  tagline: "Building reliable software that lights the way.",
  description:
    "We build custom web applications, APIs, e-commerce and WordPress solutions, and maintain software for businesses.",
};
