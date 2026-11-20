import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JobOpeningDetail } from "@/components/sections/JobOpeningDetail";
import { PageHeader } from "@/components/sections/PageHeader";
import { SendCv } from "@/components/sections/SendCv";
import { ValuesList } from "@/components/sections/ValuesList";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { openings } from "@/lib/careers";
import { careersPage } from "@/content/pages";
import { values } from "@/content/values";
import { pageMetadata } from "@/lib/seo";
import { careersEmail } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/careers",
    title: careersPage.title,
    description: careersPage.metaDescription,
  });
}

export default async function CareersPage() {
  const t = await getTranslations("careers");

  return (
    <>
      <PageHeader id="careers-title" title={careersPage.title} intro={careersPage.intro}>
        {openings.length > 1 ? (
          <nav aria-label={t("openPositions")} className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {openings.map(({ slug, title }) => (
                <li key={slug}>
                  <a
                    href={`#${slug}`}
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </PageHeader>

      {openings.length > 0 ? (
        <Section labelledBy="openings-title" className="pt-0 lg:pt-0">
          <h2 id="openings-title" className="sr-only">
            {t("openPositions")}
          </h2>
          {openings.map((opening) => (
            <JobOpeningDetail key={opening.slug} opening={opening} />
          ))}
        </Section>
      ) : (
        <SendCv email={careersEmail} />
      )}

      {values.length > 0 ? (
        <Section labelledBy="careers-values-title" tone="muted">
          <SectionHeading
            id="careers-values-title"
            title={careersPage.valuesTitle}
            intro={careersPage.valuesIntro}
          />
          <div className="mt-10">
            <ValuesList values={values} />
          </div>
        </Section>
      ) : null}
    </>
  );
}
