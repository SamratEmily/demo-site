import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/routing";
import { defaultOgImage, type OgImage } from "./seo";
import type { Product } from "./types";

/**
 * Social share images for products: public/og/products/<slug>.<locale>.png
 * (1200 × 630, static PNGs). A product without its own image, e.g. one just
 * added in the CMS, uses the default brand image. Build time only.
 */
export function productOgImage(product: Product | undefined, locale: Locale): OgImage {
  if (!product) return defaultOgImage;
  const url = `/og/products/${product.slug}.${locale}.png`;
  if (!fs.existsSync(path.join(process.cwd(), "public", url))) return defaultOgImage;
  return {
    url,
    width: 1200,
    height: 630,
    alt: `${product.name}: ${product.category[locale]}`,
  };
}
