import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { settings } from "@/lib/settings";

interface CompanyDetailsProps {
  title: string;
}

interface DetailRow {
  label: string;
  value: ReactNode;
}

const linkClass =
  "text-primary underline underline-offset-4 hover:no-underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none";

/** Company facts from content/settings.json. Empty values, and an empty section, are left out. */
export function CompanyDetails({ title }: CompanyDetailsProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { company, contact } = settings;

  const candidates: (DetailRow | false)[] = [
    !!company.legalName && { label: t("about.legalName"), value: company.legalName },
    !!company.founded && { label: t("about.founded"), value: company.founded },
    !!company.registration && { label: t("about.registration"), value: company.registration },
    !!contact.email && {
      label: t("footer.email"),
      value: (
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
      ),
    },
    !!contact.phone && {
      label: t("footer.phone"),
      value: (
        <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
          {contact.phone}
        </a>
      ),
    },
    !!contact.address[locale] && { label: t("footer.address"), value: contact.address[locale] },
    !!contact.officeHours[locale] && {
      label: t("footer.officeHours"),
      value: contact.officeHours[locale],
    },
  ];
  const rows = candidates.filter((row): row is DetailRow => row !== false);

  if (rows.length === 0) return null;

  return (
    <Section labelledBy="company-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <SectionHeading id="company-title" title={title} />
          <ButtonLink href="/contact" variant="outline" className="mt-6">
            {t("about.contactUs")}
          </ButtonLink>
        </div>
        <dl className="grid gap-x-12 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="border-t py-4">
              <dt className="text-sm text-muted-foreground">{row.label}</dt>
              <dd className="mt-1 font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
