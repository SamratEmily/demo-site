import type { Metadata } from "next";
import { site } from "@/content/site";
import { routing, type Locale } from "@/i18n/routing";

const ogLocale: Record<Locale, string> = { en: "en_US", bn: "bn_BD" };

export interface OgImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

/** public/og/default.png: brand image used when a page has no image of its own. */
export const defaultOgImage: OgImage = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
  alt: site.name,
};

/** Absolute URL of a page, e.g. ("bn", "/products") → https://…/bn/products/ */
export function pageUrl(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${site.url}/${locale}${clean}/`;
}

interface PageMetadataInput {
  locale: Locale;
  /** Path without locale, e.g. "/products/gari-becho". */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is, without the " | Beacon Soft Ltd." suffix. */
  absoluteTitle?: boolean;
  image?: OgImage;
  /** Marks the page as an article in Open Graph (blog posts). */
  article?: { publishedTime: string; authors: string[]; tags: string[] };
}

/** Title, description, canonical, hreflang alternates, Open Graph and Twitter. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  image = defaultOgImage,
  article,
}: PageMetadataInput): Metadata {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, pageUrl(l, path)]));

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: pageUrl(locale, path),
      languages: { ...languages, "x-default": pageUrl(routing.defaultLocale, path) },
    },
    openGraph: {
      ...(article ? { type: "article" as const, ...article } : { type: "website" as const }),
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: pageUrl(locale, path),
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
