import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Section } from "@/components/shared/Section";
import { buttonVariants } from "@/components/ui/button";

interface SendCvProps {
  /** Careers email; without one, visitors are sent to the contact page. */
  email: string;
}

/** Shown when there are no open positions. */
export function SendCv({ email }: SendCvProps) {
  const t = useTranslations("careers");

  return (
    <Section labelledBy="send-cv-title" className="pt-0 lg:pt-0">
      <div className="max-w-2xl border-t pt-10">
        <h2 id="send-cv-title" className="text-h2">
          {t("noOpenings")}
        </h2>
        <p className="mt-4 text-lead">{email ? t("cvBody") : t("cvBodyNoEmail")}</p>
        {email ? (
          <>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(t("cvSubject"))}`}
              className={buttonVariants({ size: "lg", className: "mt-8" })}
            >
              <Mail className="size-5" aria-hidden />
              {t("sendCv")}
            </a>
            <p className="mt-4 text-muted-foreground">{email}</p>
          </>
        ) : (
          <ButtonLink href="/contact" size="lg" className="mt-8">
            {t("contactPage")}
          </ButtonLink>
        )}
      </div>
    </Section>
  );
}
