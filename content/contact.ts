import type { Localized } from "@/lib/types";

/*
 * Options for the contact form. The `value` is what the form sends and what
 * appears in the email you receive; the label is what visitors see.
 * [TODO: confirm the budget ranges and currency]
 */
export const budgetRanges = [
  { value: "under-1-lakh", label: { en: "Under ৳1 lakh", bn: "৳১ লাখের কম" } },
  { value: "1-3-lakh", label: { en: "৳1–3 lakh", bn: "৳১–৩ লাখ" } },
  { value: "3-10-lakh", label: { en: "৳3–10 lakh", bn: "৳৩–১০ লাখ" } },
  { value: "over-10-lakh", label: { en: "Over ৳10 lakh", bn: "৳১০ লাখের বেশি" } },
  { value: "not-sure", label: { en: "Not sure yet", bn: "এখনো নিশ্চিত নই" } },
] as const satisfies readonly { value: string; label: Localized }[];

/** "Something else" in the "Interested in" list. */
export const otherInterest = {
  value: "other",
  label: { en: "Something else", bn: "অন্য কিছু" },
} as const satisfies { value: string; label: Localized };
