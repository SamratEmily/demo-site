import { z } from "zod";
// Relative imports only: functions/api/contact.ts bundles this file with
// Wrangler, which doesn't know the "@/" path alias.
import { budgetRanges, otherInterest } from "../content/contact";
import { products } from "../content/products";
import { services } from "../content/services";

/**
 * The contact form's rules, shared by the browser (react-hook-form) and the
 * Cloudflare Pages Function, so both check exactly the same things.
 * Error messages are codes; the form turns them into words in messages/*.json
 * under "contact.errors".
 */
export const contactLimits = {
  name: 100,
  email: 254,
  phone: 30,
  company: 120,
  messageMin: 20,
  message: 5000,
} as const;

export const interestValues: [string, ...string[]] = [
  otherInterest.value,
  ...services.map((s) => s.slug),
  ...products.map((p) => p.slug),
];

const budgetValues = budgetRanges.map((b) => b.value) as [string, ...string[]];

const singleLine = /^[^\r\n]*$/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phone = /^\+?[0-9][0-9\s()-]{5,28}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "required")
    .max(contactLimits.name, "tooLong")
    .regex(singleLine, "invalid"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(contactLimits.email, "tooLong")
    .regex(email, "invalidEmail"),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    .max(contactLimits.phone, "tooLong")
    .regex(phone, "invalidPhone"),
  company: z.string().trim().max(contactLimits.company, "tooLong").regex(singleLine, "invalid"),
  interest: z.enum(interestValues, "required"),
  budget: z.union([z.enum(budgetValues), z.literal("")], "invalid"),
  message: z
    .string()
    .trim()
    .min(contactLimits.messageMin, "tooShort")
    .max(contactLimits.message, "tooLong"),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** What the form POSTs to /api/contact. */
export const contactRequestSchema = contactSchema.extend({
  locale: z.enum(["en", "bn"]),
  turnstileToken: z.string().min(1).max(2048),
  /** Hidden honeypot field; people leave it empty, bots often fill it. */
  website: z.string().max(200).optional(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

/** Error codes /api/contact returns. Never anything more specific. */
export type ContactErrorCode = "invalid" | "verification" | "server";
