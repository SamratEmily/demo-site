import { Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { CheckList } from "@/components/shared/CheckList";
import { buttonVariants } from "@/components/ui/button";
import type { EmploymentType, JobOpening } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

interface JobOpeningDetailProps {
  opening: JobOpening;
  /** Where applications go; without one, the button opens the contact page. */
  email: string;
}

const typeKey = {
  "full-time": "fullTime",
  "part-time": "partTime",
  contract: "contract",
  internship: "internship",
} as const satisfies Record<EmploymentType, string>;

/** One open position with its facts, lists and an apply button. */
export function JobOpeningDetail({ opening, email }: JobOpeningDetailProps) {
  const t = useTranslations("careers");
  const locale = useLocale();
  const title = opening.title[locale];
  const titleId = `${opening.slug}-title`;
  const lists = [
    { label: t("responsibilities"), items: opening.responsibilities },
    { label: t("requirements"), items: opening.requirements },
    { label: t("niceToHave"), items: opening.niceToHave ?? [] },
  ].filter((list) => list.items.length > 0);
  const subject = encodeURIComponent(t("applySubject", { title }));

  return (
    <section
      id={opening.slug}
      aria-labelledby={titleId}
      className="grid scroll-mt-24 grid-cols-[minmax(0,1fr)] gap-8 border-t py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16"
    >
      <div>
        <h3 id={titleId} className="text-h2">
          {title}
        </h3>
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">{t("type")}</dt>
            <dd className="mt-1 font-medium">{t(typeKey[opening.type])}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("location")}</dt>
            <dd className="mt-1 font-medium">{opening.location[locale]}</dd>
          </div>
          {opening.deadline ? (
            <div>
              <dt className="text-muted-foreground">{t("deadline")}</dt>
              <dd className="mt-1 font-medium">
                <time dateTime={opening.deadline}>{formatDate(opening.deadline, locale)}</time>
              </dd>
            </div>
          ) : null}
        </dl>
        <p className="mt-6 text-lead">{opening.summary[locale]}</p>
        {email ? (
          <a
            href={`mailto:${email}?subject=${subject}`}
            // cn() so whitespace-normal replaces the button's whitespace-nowrap:
            // the label includes the job title and must wrap on phones.
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-auto min-h-12 py-2 text-left whitespace-normal",
            )}
          >
            <Mail className="size-5" aria-hidden />
            {t("apply", { title })}
          </a>
        ) : (
          <ButtonLink href="/contact" size="lg" className="mt-8">
            {t("contactPage")}
          </ButtonLink>
        )}
      </div>
      <div className="flex flex-col gap-8">
        {lists.map((list) => (
          <div key={list.label}>
            <h4 className="text-h3">{list.label}</h4>
            <CheckList className="mt-4" items={list.items.map((item) => item[locale])} />
          </div>
        ))}
      </div>
    </section>
  );
}
