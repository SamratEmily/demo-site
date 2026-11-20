"use client";

import { useRef, useState, type FormEvent } from "react";
import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { coverLetterLimit, maxResumeBytes } from "@/lib/application-schema";

const pdfMessage = "Choose a résumé in PDF format.";
const sizeMessage = "Choose a résumé under 3 MB.";
const deliveryMessage = "We couldn’t send your application. Try again in a few minutes.";

export function JobApplicationForm({ position, email }: { position: string; email: string }) {
  const [status, setStatus] = useState<"ready" | "sending" | "sent">("ready");
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const resumeInput = useRef<HTMLInputElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const form = event.currentTarget;
    const file = resumeInput.current?.files?.[0];
    if (!file || !/\.pdf$/i.test(file.name) || file.size > maxResumeBytes) {
      setError(file && file.size > maxResumeBytes ? sizeMessage : pdfMessage);
      resumeInput.current?.focus();
      return;
    }

    inFlight.current = true;
    setError("");
    setStatus("sending");
    try {
      const response = await fetch(form.action, { method: "POST", body: new FormData(form) });
      const body = await response.json().catch(() => null);
      if (response.ok && body?.ok === true) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("ready");
        setError(
          body?.error === "size"
            ? sizeMessage
            : body?.error === "resume"
              ? pdfMessage
              : body?.error === "invalid"
                ? "Check your details and try again."
                : deliveryMessage,
        );
      }
    } catch {
      setStatus("ready");
      setError(deliveryMessage);
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <>
      <p role="status" className={status === "sent" ? "max-w-2xl text-lead" : "sr-only"}>
        {status === "sent" ? `Your application for ${position} was sent.` : ""}
      </p>
      {status !== "sent" ? (
        <form
          action="/api/apply"
          method="post"
          encType="multipart/form-data"
          onSubmit={submit}
          aria-labelledby="application-title"
          aria-busy={status === "sending"}
          className="grid max-w-2xl gap-6 border-t pt-8"
        >
          <input type="hidden" name="position" value={position} />
          <div hidden>
            <label htmlFor="apply-website">Leave this field empty</label>
            <input id="apply-website" name="website" autoComplete="off" tabIndex={-1} />
          </div>
          <FormField id="apply-name" label="Full name">
            <Input id="apply-name" name="name" autoComplete="name" required maxLength={100} />
          </FormField>
          <FormField id="apply-email" label="Email">
            <Input
              id="apply-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </FormField>
          <FormField
            id="apply-phone"
            label="Phone number"
            hint="Include your country code if outside Bangladesh."
          >
            <Input
              id="apply-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={7}
              maxLength={30}
              aria-describedby="apply-phone-hint"
            />
          </FormField>
          <FormField id="apply-letter" label="Cover letter">
            <Textarea
              id="apply-letter"
              name="coverLetter"
              rows={7}
              required
              maxLength={coverLetterLimit}
            />
          </FormField>
          <FormField id="apply-resume" label="Résumé" hint="Upload a PDF up to 3 MB.">
            <Input
              ref={resumeInput}
              id="apply-resume"
              name="resume"
              type="file"
              accept=".pdf,application/pdf"
              required
              aria-describedby="apply-resume-hint"
            />
          </FormField>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
              {email ? (
                <>
                  {" "}
                  You can also apply by email at{" "}
                  <a className="underline" href={`mailto:${email}`}>
                    {email}
                  </a>
                  .
                </>
              ) : null}
            </p>
          ) : null}
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="justify-self-start"
          >
            {status === "sending" ? "Sending…" : "Submit application"}
          </Button>
        </form>
      ) : null}
    </>
  );
}
