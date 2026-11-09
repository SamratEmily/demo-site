"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { describedBy, FormField } from "@/components/shared/FormField";
import { Turnstile } from "@/components/shared/Turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import {
  contactLimits,
  contactSchema,
  type ContactData,
  type ContactErrorCode,
  type ContactInput,
} from "@/lib/contact-schema";

interface Option {
  value: string;
  label: string;
}

interface ContactFormProps {
  interestGroups: { label: string; options: Option[] }[];
  /** Ungrouped options shown after the groups, e.g. "Something else". */
  interestExtra: Option[];
  budgetOptions: Option[];
  /** Shown in the server error message so people have another way to reach us. */
  fallbackEmail: string;
}

type SubmitError = ContactErrorCode | "network" | "turnstile" | "notConfigured";
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; name: string; email: string }
  | { kind: "error"; code: SubmitError };

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const defaultValues: ContactInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  interest: "",
  budget: "",
  message: "",
};

function responseError(body: unknown): ContactErrorCode {
  if (typeof body === "object" && body !== null && "error" in body) {
    const { error } = body;
    if (error === "invalid" || error === "verification") return error;
  }
  return "server";
}

export function ContactForm({
  interestGroups,
  interestExtra,
  budgetOptions,
  fallbackEmail,
}: ContactFormProps) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [token, setToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const statusMessage = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  // Preselect from links such as /contact/?product=gari-becho or ?service=e-commerce.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wanted = params.get("product") ?? params.get("service");
    const offered = [...interestGroups.flatMap((g) => g.options), ...interestExtra];
    if (wanted && offered.some((o) => o.value === wanted)) setValue("interest", wanted);
  }, [setValue, interestGroups, interestExtra]);

  useEffect(() => {
    if (status.kind === "success") successHeading.current?.focus();
    if (status.kind === "error") statusMessage.current?.focus();
  }, [status]);

  function errorText(field: keyof ContactInput): string | undefined {
    const code = errors[field]?.message;
    switch (code) {
      case undefined:
        return undefined;
      case "required":
        return t("errors.required");
      case "tooLong":
        return t("errors.tooLong", {
          max: contactLimits[field as keyof typeof contactLimits] ?? 0,
        });
      case "tooShort":
        return t("errors.tooShort", { min: contactLimits.messageMin });
      case "invalidEmail":
        return t("errors.invalidEmail");
      case "invalidPhone":
        return t("errors.invalidPhone");
      default:
        return t("errors.invalid");
    }
  }

  function submitErrorText(code: SubmitError): string {
    if (code === "server") {
      return fallbackEmail
        ? t("submitErrors.serverEmail", { email: fallbackEmail })
        : t("submitErrors.server");
    }
    return t(`submitErrors.${code}`);
  }

  function field(name: keyof ContactInput, hint?: string) {
    const error = errorText(name);
    return {
      id: `contact-${name}`,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy(`contact-${name}`, hint, error),
      ...register(name),
    };
  }

  async function onSubmit(data: ContactData, event?: BaseSyntheticEvent) {
    const form = event?.target instanceof HTMLFormElement ? event.target : null;
    const website = form?.elements.namedItem("website");
    if (!siteKey) return setStatus({ kind: "error", code: "notConfigured" });
    if (!token) return setStatus({ kind: "error", code: "turnstile" });

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken: token,
          website: website instanceof HTMLInputElement ? website.value : "",
        }),
      });
      const body: unknown = await res.json().catch(() => null);
      if (res.ok) {
        setStatus({ kind: "success", name: data.name, email: data.email });
        reset(defaultValues);
      } else {
        setStatus({ kind: "error", code: responseError(body) });
      }
    } catch {
      setStatus({ kind: "error", code: "network" });
    } finally {
      // Turnstile tokens work only once.
      setTurnstileReset((n) => n + 1);
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-2xl border bg-surface-muted p-8" role="status">
        <CircleCheck className="size-8 text-primary" aria-hidden />
        <h2 ref={successHeading} tabIndex={-1} className="mt-4 text-h2 focus:outline-none">
          {t("successTitle")}
        </h2>
        <p className="mt-3 text-lead">
          {t("successBody", { name: status.name, email: status.email })}
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus({ kind: "idle" })}>
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const phoneHint = t("phoneHint");
  const messageHint = t("messageHint");

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="contact-form-title"
      aria-busy={submitting}
      className="grid gap-6 sm:grid-cols-2"
    >
      <h2 id="contact-form-title" className="text-h2 sm:col-span-2">
        {t("formTitle")}
      </h2>

      <FormField id="contact-name" label={t("name")} error={errorText("name")}>
        <Input
          autoComplete="name"
          aria-required
          maxLength={contactLimits.name}
          {...field("name")}
        />
      </FormField>
      <FormField id="contact-email" label={t("email")} error={errorText("email")}>
        <Input
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-required
          maxLength={contactLimits.email}
          {...field("email")}
        />
      </FormField>
      <FormField id="contact-phone" label={t("phone")} hint={phoneHint} error={errorText("phone")}>
        <Input
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          aria-required
          maxLength={contactLimits.phone}
          {...field("phone", phoneHint)}
        />
      </FormField>
      <FormField
        id="contact-company"
        label={t("company")}
        labelNote={t("optional")}
        error={errorText("company")}
      >
        <Input
          autoComplete="organization"
          maxLength={contactLimits.company}
          {...field("company")}
        />
      </FormField>

      <FormField id="contact-interest" label={t("interest")} error={errorText("interest")}>
        <NativeSelect className="w-full" aria-required {...field("interest")}>
          <NativeSelectOption value="">{t("interestPlaceholder")}</NativeSelectOption>
          {interestGroups.map((group) => (
            <NativeSelectOptGroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelectOptGroup>
          ))}
          {interestExtra.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </FormField>
      <FormField
        id="contact-budget"
        label={t("budget")}
        labelNote={t("optional")}
        error={errorText("budget")}
      >
        <NativeSelect className="w-full" {...field("budget")}>
          <NativeSelectOption value="">{t("budgetPlaceholder")}</NativeSelectOption>
          {budgetOptions.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </FormField>

      <FormField
        id="contact-message"
        label={t("message")}
        hint={messageHint}
        error={errorText("message")}
        className="sm:col-span-2"
      >
        <Textarea
          rows={6}
          aria-required
          maxLength={contactLimits.message}
          {...field("message", messageHint)}
        />
      </FormField>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        {siteKey ? (
          <Turnstile siteKey={siteKey} onToken={setToken} resetKey={turnstileReset} />
        ) : (
          <p className="text-sm text-muted-foreground">{t("submitErrors.notConfigured")}</p>
        )}

        {status.kind === "error" ? (
          <div
            ref={statusMessage}
            tabIndex={-1}
            role="alert"
            className="flex gap-3 rounded-lg border border-destructive/40 p-4 text-sm focus:outline-none"
          >
            <CircleAlert className="size-5 shrink-0 text-destructive" aria-hidden />
            <p>{submitErrorText(status.code)}</p>
          </div>
        ) : null}

        <Button type="submit" size="lg" disabled={submitting} className="self-start">
          {submitting ? (
            <LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden />
          ) : null}
          {submitting ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
