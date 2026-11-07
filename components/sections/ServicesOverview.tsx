import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { ContentIcon } from "@/components/shared/ContentIcon";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { services } from "@/content/services";

export function ServicesOverview() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <Section labelledBy="services-title" tone="muted">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="services-title"
          title={home.services.title[locale]}
          intro={home.services.intro?.[locale]}
        />
        <ButtonLink href="/services" variant="link" className="self-start px-0 md:self-auto">
          {t("seeServices")}
        </ButtonLink>
      </div>

      <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="border-t pt-6">
            <ContentIcon name={service.icon} className="size-6 text-primary" />
            <h3 className="mt-4 text-h3">{service.title[locale]}</h3>
            <p className="mt-2 text-muted-foreground">{service.summary[locale]}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
