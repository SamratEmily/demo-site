import { z } from "zod";
import { imageSizeOf, readJsonEntries, type JsonEntry } from "./content-files";
import {
  httpsUrl,
  icon,
  imagePath,
  inOrder,
  list,
  optionalHttpsUrl,
  optionalObject,
  optionalText,
  order,
  parseContent,
  text,
} from "./content-schema";
import { productStatuses, type Product } from "./types";

/**
 * Products live in content/products/<slug>.json, edited in the CMS.
 * Image sizes are read from the files, so editors never type them.
 */
const step = z.object({ title: text(80), description: text(400) });
const result = z.object({ value: text(40), label: text(160) });
const faqItem = z.object({ question: text(200), answer: text(1200) });

const schema = z.object({
  order,
  name: text(80),
  status: z.enum(productStatuses, `must be one of: ${productStatuses.join(", ")}`),
  icon,
  url: optionalHttpsUrl,
  category: text(80),
  summary: text(400),
  problem: optionalText(1500),
  howItWorks: list(step),
  features: z
    .array(z.object({ icon, title: text(80), description: text(400) }), "must be a list")
    .min(1, "needs at least one feature"),
  screenshot: optionalObject({ src: imagePath, alt: text(400) }),
  gallery: list(z.object({ src: imagePath, caption: text(120), alt: text(400) })),
  video: optionalObject({
    src: httpsUrl,
    durationSeconds: z.number("must be a number").int().positive(),
    description: optionalText(300),
  }),
  audience: list(text(200)),
  technologies: list(text(40)),
  results: list(result),
  faq: list(faqItem),
});

function toProduct({ slug, file, data }: JsonEntry) {
  const { order, screenshot, gallery, ...fields } = parseContent(schema, data, file);
  const product: Product = {
    slug,
    ...fields,
    screenshot: screenshot && { ...screenshot, ...imageSizeOf(screenshot.src, file) },
    gallery: gallery.map((image) => ({ ...image, ...imageSizeOf(image.src, file) })),
  };
  return { order, key: fields.name, value: product };
}

/** All products, in the order set by their "order" field (then by name). */
export const products: Product[] = inOrder(readJsonEntries("products").map(toProduct));

if (products.length === 0) throw new Error("content/products: add at least one product.");

/** The first live product is featured on the Home page. */
export const spotlightProduct = products.find((p) => p.status === "live") ?? products[0];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
