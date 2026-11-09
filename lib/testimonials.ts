import { z } from "zod";
import { readJsonEntries, type JsonEntry } from "./content-files";
import { inOrder, order, parseContent, text } from "./content-schema";
import type { Testimonial } from "./types";

/**
 * Testimonials live in content/testimonials/<slug>.json, edited in the CMS.
 * Real quotes only, with the client's written permission to publish. The
 * Home page hides the section while there are none.
 */
const schema = z.object({
  order,
  quote: text(600),
  name: text(80),
  role: text(80),
  company: text(120),
});

function toTestimonial({ file, data }: JsonEntry) {
  const { order, ...testimonial } = parseContent(schema, data, file);
  return { order, key: testimonial.name, value: testimonial satisfies Testimonial };
}

export const testimonials: Testimonial[] = inOrder(
  readJsonEntries("testimonials").map(toTestimonial),
);
