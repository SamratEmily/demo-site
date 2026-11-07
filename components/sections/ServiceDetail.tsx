import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { CheckList } from "@/components/shared/CheckList";
import { ContentIcon } from "@/components/shared/ContentIcon";
import { TechList } from "@/components/shared/TechList";
import { serviceQuoteHref } from "@/content/navigation";
import { servicesPage } from "@/content/pages";
import type { Service } from "@/lib/types";

interface ServiceDetailProps {
  service: Service;
}

/** One service: what it is on the left, what you get on the right. */
export function ServiceDetail({ service }: ServiceDetailProps) {
  const t = useTranslations("services");
  const locale = useLocale();
  const titleId = `${service.slug}-title`;
  const title = service.title[locale];

  return (
    <section
      id={service.slug}
      aria-labelledby={titleId}
      className="grid scroll-mt-24 grid-cols-[minmax(0,1fr)] gap-10 border-t py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
    >
      <div>
        <ContentIcon name={service.icon} className="size-8 text-primary" />
        <h2 id={titleId} className="mt-5 text-h2">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-lead">{service.description[locale]}</p>
        <ButtonLink
          href={serviceQuoteHref(service.slug)}
          variant="outline"
          className="mt-8 h-auto min-h-11 py-2 text-left whitespace-normal"
        >
          {t("getQuote", { service: title })}
        </ButtonLink>
      </div>

      <div className="flex flex-col gap-10 lg:pt-14">
        <div>
          <h3 className="text-h3">{servicesPage.includedTitle[locale]}</h3>
          <CheckList className="mt-5" items={service.included.map((item) => item[locale])} />
        </div>
        {service.technologies.length > 0 ? (
          <div>
            <h3 className="text-h3">{servicesPage.technologiesTitle[locale]}</h3>
            <TechList className="mt-4" items={service.technologies} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
