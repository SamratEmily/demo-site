import { z } from "zod";
import { readJsonEntries, type JsonEntry } from "./content-files";
import { inOrder, order, parseContent, text } from "./content-schema";
import type { Testimonial } from "./types";

/**
 * Testimonials live in content/testimonials/<slug>.json, edited in the CMS.
 * Real quotes only, with the client's written permission to publish. The
 * Home page hides the section while there are none.
 */
const english = z.object({
  order,
  quote: text(600),
  name: text(80),
  role: text(80),
  company: text(120),
});

const bangla = z.object({ quote: text(600), role: text(80) });

function toTestimonial({ file, ...raw }: JsonEntry) {
  const en = parseContent(english, raw.en, `${file} (English)`);
  const bn = parseContent(bangla, raw.bn, `${file} (Bangla)`);
  const testimonial: Testimonial = {
    quote: { en: en.quote, bn: bn.quote },
    name: en.name,
    role: { en: en.role, bn: bn.role },
    company: en.company,
  };
  return { order: en.order, key: en.name, value: testimonial };
}

export const testimonials: Testimonial[] = inOrder(
  readJsonEntries("testimonials").map(toTestimonial),
);
