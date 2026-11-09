export { cn } from "cn";

/** "https://garibecho.com/path" → "garibecho.com" */
export function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** Heading text → URL fragment, e.g. "Our solution" → "our-solution". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

/** "2026-11-07" → "7 November 2026". */
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}
