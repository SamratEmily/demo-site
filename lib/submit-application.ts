import { applicationSchema, maxResumeBytes } from "./application-schema";
import settings from "../content/settings.json";

export interface ApplicationEnv {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CAREERS_TO_EMAIL?: string;
}

const maxRequestBytes = maxResumeBytes + 64 * 1024;

function reply(status: number, error?: "invalid" | "resume" | "size" | "delivery") {
  return Response.json(error ? { error } : { ok: true }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function submitApplication(request: Request, env: ApplicationEnv): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply(403, "invalid");

  const contentType = request.headers.get("content-type");
  if (!contentType?.startsWith("multipart/form-data;") || !request.body) {
    return reply(415, "invalid");
  }
  if (Number(request.headers.get("content-length")) > maxRequestBytes) return reply(413, "size");

  let bytes = 0;
  const stream = request.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        bytes += chunk.byteLength;
        if (bytes > maxRequestBytes) controller.error(new Error("Request too large"));
        else controller.enqueue(chunk);
      },
    }),
  );

  let form: FormData;
  try {
    form = await new Response(stream, { headers: { "Content-Type": contentType } }).formData();
  } catch {
    return bytes > maxRequestBytes ? reply(413, "size") : reply(400, "invalid");
  }
  if (form.get("website")) return reply(400, "invalid");

  const parsed = applicationSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return reply(400, "invalid");
  const resume = form.get("resume");
  if (typeof resume === "string" || !resume || !resume.size) return reply(400, "resume");
  if (resume.size > maxResumeBytes) return reply(413, "size");
  if ((await resume.slice(0, 5).text()) !== "%PDF-") return reply(400, "resume");

  const to = env.CAREERS_TO_EMAIL || settings.contact.careersEmail || settings.contact.email;
  const configuredSender = env.CONTACT_FROM_EMAIL?.trim();
  const senderAddress = configuredSender?.match(/<([^<>]+)>$/)?.[1].trim() ?? configuredSender;
  if (!env.RESEND_API_KEY || !senderAddress || !to) return reply(503, "delivery");

  const { position, name, email, phone, coverLetter } = parsed.data;
  try {
    const fileBytes = new Uint8Array(await resume.arrayBuffer());
    let binary = "";
    for (let offset = 0; offset < fileBytes.length; offset += 8192) {
      binary += String.fromCharCode(...fileBytes.subarray(offset, offset + 8192));
    }
    const content = btoa(binary);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Hiring Beacon <${senderAddress}>`,
        to: [to],
        reply_to: email,
        subject: `Hiring Beacon | Application for ${position}`,
        text: `Position: ${position}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nCover letter\n${coverLetter}`,
        attachments: [{ filename: "resume.pdf", content }],
      }),
    });
    if (!response.ok) return reply(502, "delivery");
  } catch {
    return reply(502, "delivery");
  }

  return reply(200);
}
