import { NumberedSteps } from "@/components/shared/NumberedSteps";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { processSteps } from "@/content/process";

/** Home page: our 6-step delivery process. */
export function ProcessSteps() {
  return (
    <Section labelledBy="process-title" tone="muted">
      <SectionHeading id="process-title" title={home.process.title} intro={home.process.intro} />
      <NumberedSteps steps={processSteps} className="mt-12" />
    </Section>
  );
}
