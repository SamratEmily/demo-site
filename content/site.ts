import type { SiteConfig } from "@/lib/types";
// Relative import: the Pages Functions (CMS login) bundle this file with
// Wrangler, which doesn't know the "@/" alias.
import settings from "./settings.json";

/**
 * The live site's address, from content/settings.json (CMS: Site settings →
 * Website address). Every absolute URL (canonical, hreflang, Open Graph,
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
  url: siteOrigin(settings.en.site.url),
  tagline: {
    en: "Building reliable software that lights the way.",
    bn: "নির্ভরযোগ্য সফটওয়্যার, যা পথ দেখায়।",
  },
  description: {
    en: "We build custom web applications, APIs, e-commerce and WordPress solutions, and maintain software for businesses.",
    bn: "আমরা ব্যবসার জন্য কাস্টম ওয়েব অ্যাপ্লিকেশন, API, ই-কমার্স ও WordPress সমাধান তৈরি করি এবং সফটওয়্যার রক্ষণাবেক্ষণ করি।",
  },
};
