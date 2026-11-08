import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JobOpeningDetail } from "@/components/sections/JobOpeningDetail";
import { PageHeader } from "@/components/sections/PageHeader";
import { SendCv } from "@/components/sections/SendCv";
import { ValuesList } from "@/components/sections/ValuesList";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { openings } from "@/lib/careers";
import { careersPage } from "@/content/pages";
import { values } from "@/content/values";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { careersEmail } from "@/lib/settings";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata({
    locale,
    path: "/careers",
    title: careersPage.title[locale],
    description: careersPage.metaDescription[locale],
  });
}

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("careers");

  return (
    <>
      <PageHeader
        id="careers-title"
        title={careersPage.title[locale]}
        intro={careersPage.intro[locale]}
      />

      {openings.length > 0 ? (
        <Section labelledBy="openings-title" className="pt-0 lg:pt-0">
          <h2 id="openings-title" className="sr-only">
            {t("openPositions")}
          </h2>
          {openings.map((opening) => (
            <JobOpeningDetail key={opening.slug} opening={opening} email={careersEmail} />
          ))}
          {careersEmail ? (
            <div className="max-w-2xl border-t pt-8">
              <h3 className="text-h3">{t("howToApply")}</h3>
              <p className="mt-3 text-muted-foreground">
                {t("howToApplyBody", { email: careersEmail })}
              </p>
            </div>
          ) : null}
        </Section>
      ) : (
        <SendCv email={careersEmail} />
      )}

      {values.length > 0 ? (
        <Section labelledBy="careers-values-title" tone="muted">
          <SectionHeading
            id="careers-values-title"
            title={careersPage.valuesTitle[locale]}
            intro={careersPage.valuesIntro[locale]}
          />
          <div className="mt-10">
            <ValuesList values={values} />
          </div>
        </Section>
      ) : null}
    </>
  );
}
