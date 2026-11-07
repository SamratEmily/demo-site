export { cn } from "cn";

/** "https://garibecho.com/path" → "garibecho.com" */
export function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** Heading text → URL fragment. Keeps Bangla letters, e.g. "Our solution" → "our-solution". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

/** "2026-11-07" → "7 November 2026" / "৭ নভেম্বর, ২০২৬". */
export function formatDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
