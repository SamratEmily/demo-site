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

const intlLocale = (locale: string) => (locale === "bn" ? "bn-BD" : "en-GB");

/** Number in the page's digits: 1 → "1" / "১". */
export function formatNumber(
  value: number,
  locale: string,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(intlLocale(locale), { useGrouping: false, ...options }).format(
    value,
  );
}

/** "2026-11-07" → "7 November 2026" / "৭ নভেম্বর, ২০২৬". */
export function formatDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
