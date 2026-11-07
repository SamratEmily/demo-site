import type { Product } from "@/lib/types";
import { gariBecho } from "./gari-becho";
import { ieltsPlatform, inventoryManagement, laundryPos, onushilon360 } from "./placeholders";

/**
 * All products. Order here is the order on the site.
 * Add a new product by creating a file in this folder and listing it below.
 */
export const products: Product[] = [
  gariBecho,
  inventoryManagement,
  ieltsPlatform,
  laundryPos,
  onushilon360,
];

/** The first live product is featured on the Home page. */
export const spotlightProduct = products.find((p) => p.status === "live") ?? products[0];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
