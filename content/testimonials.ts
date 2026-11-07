import type { Testimonial } from "@/lib/types";

/**
 * Real testimonials only, with the client's written permission to publish.
 * The Home page hides the testimonials section while this list is empty.
 *
 * Example entry:
 * {
 *   quote: { en: "…", bn: "…" },
 *   name: "Full name",
 *   role: { en: "Owner", bn: "মালিক" },
 *   company: "Company name",
 * },
 */
export const testimonials: Testimonial[] = [];
