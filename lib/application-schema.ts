import { z } from "zod";

export const maxResumeBytes = 3 * 1024 * 1024;
export const coverLetterLimit = 5000;

export const applicationSchema = z.object({
  position: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[^\r\n]+$/),
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .regex(/^\+?[\d ().-]+$/)
    .refine((phone) => phone.replace(/\D/g, "").length >= 7),
  coverLetter: z.string().trim().min(1).max(coverLetterLimit),
});
