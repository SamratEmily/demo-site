/**
 * POST /api/contact — Cloudflare Pages Function for the contact form.
 *
 * 1. Rejects oversized or non-JSON requests.
 * 2. Validates the fields with the same zod schema the form uses.
 * 3. Verifies the Cloudflare Turnstile token.
 * 4. Sends the enquiry with Resend, reply-to set to the visitor.
 *
 * Secrets come only from environment variables (Cloudflare dashboard, or
 * .dev.vars locally). Responses carry a generic error code, never details.
 */
import {
  contactRequestSchema,
  type ContactErrorCode,
  type ContactRequest,
} from "../../lib/contact-schema";

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  TURNSTILE_SECRET?: string;
  /** Optional sender, e.g. "Beacon Soft website <website@yourdomain>". Must be a Resend-verified domain. */
  CONTACT_FROM_EMAIL?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const maxBodyBytes = 16 * 1024;
const fetchTimeoutMs = 10_000;
// Resend's shared test sender; it can only deliver to your own Resend account email.
const fallbackFrom = "Beacon Soft website <onboarding@resend.dev>";

function respond(body: { ok: true } | { ok: false; error: ContactErrorCode }, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

const fail = (error: ContactErrorCode, status: number) => respond({ ok: false, error }, status);

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(fetchTimeoutMs),
  });
  if (!res.ok) return false;
  const result: unknown = await res.json();
  return (
    typeof result === "object" && result !== null && "success" in result && result.success === true
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function emailContent(data: ContactRequest) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company || "—"],
    ["Interested in", data.interest],
    ["Budget", data.budget || "—"],
    ["Site language", data.locale === "bn" ? "Bangla" : "English"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message}\n`;
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`,
    )
    .join(
      "",
    )}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.message)}</p>`;
  // Name is validated as a single line; strip control characters anyway before using it in a header.
  const subject = `New enquiry from ${data.name.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 80)}`;
  return { subject, text, html };
}

async function sendEmail(
  env: Required<Pick<Env, "RESEND_API_KEY" | "CONTACT_TO_EMAIL">> & Env,
  data: ContactRequest,
) {
  const { subject, text, html } = emailContent(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || fallbackFrom,
      to: env.CONTACT_TO_EMAIL.split(",").map((address) => address.trim()),
      reply_to: data.email,
      subject,
      text,
      html,
    }),
    signal: AbortSignal.timeout(fetchTimeoutMs),
  });
  if (!res.ok) throw new Error(`Resend responded with status ${res.status}`);
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, TURNSTILE_SECRET } = env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !TURNSTILE_SECRET) {
    console.error("contact: RESEND_API_KEY, CONTACT_TO_EMAIL or TURNSTILE_SECRET is not set");
    return fail("server", 500);
  }

  if (!request.headers.get("content-type")?.includes("application/json"))
    return fail("invalid", 415);
  if (Number(request.headers.get("content-length") ?? 0) > maxBodyBytes)
    return fail("invalid", 413);
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > maxBodyBytes) return fail("invalid", 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail("invalid", 400);
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) return fail("invalid", 400);
  const data = parsed.data;

  // Honeypot filled in: pretend it worked so the bot learns nothing.
  if (data.website) return respond({ ok: true }, 200);

  try {
    const human = await verifyTurnstile(
      data.turnstileToken,
      TURNSTILE_SECRET,
      request.headers.get("CF-Connecting-IP"),
    );
    if (!human) return fail("verification", 403);
  } catch {
    console.error("contact: Turnstile verification request failed");
    return fail("server", 502);
  }

  try {
    await sendEmail({ ...env, RESEND_API_KEY, CONTACT_TO_EMAIL }, data);
  } catch (error) {
    console.error(
      "contact: sending email failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return fail("server", 502);
  }

  return respond({ ok: true }, 200);
}
