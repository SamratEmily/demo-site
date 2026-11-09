/*
 * Options for the contact form. The `value` is what the form sends and what
 * appears in the email you receive; the label is what visitors see.
 * [TODO: confirm the budget ranges and currency]
 */
export const budgetRanges = [
  { value: "under-1-lakh", label: "Under ৳1 lakh" },
  { value: "1-3-lakh", label: "৳1–3 lakh" },
  { value: "3-10-lakh", label: "৳3–10 lakh" },
  { value: "over-10-lakh", label: "Over ৳10 lakh" },
  { value: "not-sure", label: "Not sure yet" },
] as const satisfies readonly { value: string; label: string }[];

/** "Something else" in the "Interested in" list. */
export const otherInterest = {
  value: "other",
  label: "Something else",
} as const satisfies { value: string; label: string };
