import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CompanyDetails } from "@/components/sections/CompanyDetails";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { PageHeader } from "@/components/sections/PageHeader";
import { TeamList } from "@/components/sections/TeamList";
import { ValuesList } from "@/components/sections/ValuesList";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { quoteHref } from "@/content/navigation";
import { aboutPage } from "@/content/pages";
import { team } from "@/lib/team";
import { values } from "@/content/values";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/about",
    title: aboutPage.title,
    description: aboutPage.metaDescription,
  });
}

export default async function AboutPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHeader id="about-title" title={aboutPage.title} intro={aboutPage.intro} />

      {aboutPage.story.length > 0 ? (
        <Section labelledBy="story-title">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <SectionHeading id="story-title" title={aboutPage.storyTitle} />
            <div className="flex max-w-prose flex-col gap-5 text-lead">
              {aboutPage.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <Section labelledBy="mission-title" tone="deep">
        <h2 id="mission-title" className="text-h3 text-muted-foreground">
          {aboutPage.missionTitle}
        </h2>
        <p className="mt-6 max-w-4xl text-h1 font-semibold">{aboutPage.mission}</p>
      </Section>

      {values.length > 0 ? (
        <Section labelledBy="values-title">
          <SectionHeading id="values-title" title={aboutPage.valuesTitle} />
          <div className="mt-10">
            <ValuesList values={values} />
          </div>
        </Section>
      ) : null}

      {team.length > 0 ? (
        <Section labelledBy="team-title" tone="muted">
          <SectionHeading id="team-title" title={aboutPage.teamTitle} intro={aboutPage.teamIntro} />
          <div className="mt-10">
            <TeamList members={team} />
          </div>
        </Section>
      ) : null}

      <CompanyDetails title={aboutPage.companyTitle} />

      <CtaPanel
        id="about-cta-title"
        title={aboutPage.ctaTitle}
        body={aboutPage.ctaBody}
        action={{ href: quoteHref, label: t("header.getQuote") }}
      />
    </>
  );
}
