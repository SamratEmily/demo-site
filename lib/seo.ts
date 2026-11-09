import type { Metadata } from "next";
import { site } from "@/content/site";

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

/** Absolute URL of a page, e.g. "/products" → https://…/products/ */
export function pageUrl(path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${site.url}${clean}/`;
}

interface PageMetadataInput {
  /** e.g. "/products/gari-becho". */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is, without the " | Beacon Soft Ltd." suffix. */
  absoluteTitle?: boolean;
  image?: OgImage;
  /** Marks the page as an article in Open Graph (blog posts). */
  article?: { publishedTime: string; authors: string[]; tags: string[] };
}

/** Title, description, canonical URL, Open Graph and Twitter. */
export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
  image = defaultOgImage,
  article,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: pageUrl(path) },
    openGraph: {
      ...(article ? { type: "article" as const, ...article } : { type: "website" as const }),
      siteName: site.name,
      locale: "en_US",
      url: pageUrl(path),
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
