import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/Section";
import type { CaseStudyMeta } from "@/lib/types";

interface CaseStudyResultsProps {
  results: CaseStudyMeta["results"];
}

/** Measured outcomes as large figures on the navy band. Hidden when empty. */
export function CaseStudyResults({ results }: CaseStudyResultsProps) {
  const t = useTranslations("caseStudies");
  if (results.length === 0) return null;

  return (
    <Section labelledBy="results-title" tone="deep" className="py-14 lg:py-16">
      <h2 id="results-title" className="text-h3">
        {t("results")}
      </h2>
      <dl className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div key={result.label} className="flex flex-col-reverse justify-end gap-2 border-t pt-5">
            <dt className="text-muted-foreground">{result.label}</dt>
            <dd className="text-h2 font-semibold">{result.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
