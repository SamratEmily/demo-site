import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { team } from "@/lib/team";
import { TeamList } from "./TeamList";

/** Home page: the team, in priority order. Hidden until team members are added. */
export function HomeTeam() {
  const t = useTranslations("home");
  if (team.length === 0) return null;

  return (
    <Section labelledBy="home-team-title" tone="muted">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="home-team-title" title={home.team.title} intro={home.team.intro} />
        <ButtonLink href="/about" variant="link" className="self-start px-0 md:self-auto">
          {t("moreAboutUs")}
        </ButtonLink>
      </div>
      <div className="mt-12">
        <TeamList members={team} />
      </div>
    </Section>
  );
}
