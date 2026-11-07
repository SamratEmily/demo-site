import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CompanyDetails } from "@/components/sections/CompanyDetails";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { PageHeader } from "@/components/sections/PageHeader";
import { TeamList } from "@/components/sections/TeamList";
import { ValuesList } from "@/components/sections/ValuesList";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { quoteHref } from "@/content/navigation";
import { aboutPage } from "@/content/pages";
import { team } from "@/content/team";
import { values } from "@/content/values";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata({
    locale,
    path: "/about",
    title: aboutPage.title[locale],
    description: aboutPage.metaDescription[locale],
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        id="about-title"
        title={aboutPage.title[locale]}
        intro={aboutPage.intro[locale]}
      />

      {aboutPage.story.length > 0 ? (
        <Section labelledBy="story-title">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <SectionHeading id="story-title" title={aboutPage.storyTitle[locale]} />
            <div className="flex max-w-prose flex-col gap-5 text-lead">
              {aboutPage.story.map((paragraph) => (
                <p key={paragraph.en}>{paragraph[locale]}</p>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <Section labelledBy="mission-title" tone="deep">
        <h2 id="mission-title" className="text-h3 text-muted-foreground">
          {aboutPage.missionTitle[locale]}
        </h2>
        <p className="mt-6 max-w-4xl text-h1 font-semibold">{aboutPage.mission[locale]}</p>
      </Section>

      {values.length > 0 ? (
        <Section labelledBy="values-title">
          <SectionHeading id="values-title" title={aboutPage.valuesTitle[locale]} />
          <div className="mt-10">
            <ValuesList values={values} />
          </div>
        </Section>
      ) : null}

      {team.length > 0 ? (
        <Section labelledBy="team-title" tone="muted">
          <SectionHeading
            id="team-title"
            title={aboutPage.teamTitle[locale]}
            intro={aboutPage.teamIntro[locale]}
          />
          <div className="mt-10">
            <TeamList members={team} />
          </div>
        </Section>
      ) : null}

      <CompanyDetails title={aboutPage.companyTitle[locale]} />

      <CtaPanel
        id="about-cta-title"
        title={aboutPage.ctaTitle[locale]}
        body={aboutPage.ctaBody[locale]}
        action={{ href: quoteHref, label: t("header.getQuote") }}
      />
    </>
  );
}
