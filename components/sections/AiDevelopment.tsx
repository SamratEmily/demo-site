import { useLocale } from "next-intl";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { ValuesList } from "./ValuesList";

/** Home page: how we use AI when building products. */
export function AiDevelopment() {
  const locale = useLocale();
  const { title, intro, points } = home.aiDevelopment;

  return (
    <Section labelledBy="ai-title">
      <SectionHeading id="ai-title" title={title[locale]} intro={intro?.[locale]} />
      <div className="mt-12">
        <ValuesList values={points} />
      </div>
    </Section>
  );
}
