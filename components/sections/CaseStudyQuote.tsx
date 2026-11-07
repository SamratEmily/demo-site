import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/Section";
import type { CaseStudyMeta } from "@/lib/types";

interface CaseStudyQuoteProps {
  quote: CaseStudyMeta["quote"];
}

/** The client's own words. Hidden until a real, approved quote exists. */
export function CaseStudyQuote({ quote }: CaseStudyQuoteProps) {
  const t = useTranslations("caseStudies");
  if (!quote) return null;

  return (
    <Section labelledBy="quote-title" tone="muted" container="narrow">
      <h2 id="quote-title" className="sr-only">
        {t("quote")}
      </h2>
      <figure className="border-l-4 border-brand-amber pl-6 sm:pl-10">
        <blockquote className="text-h3 leading-snug font-medium">
          <p>“{quote.text}”</p>
        </blockquote>
        <figcaption className="mt-6">
          <span className="font-semibold">{quote.name}</span>
          <span className="text-muted-foreground">, {quote.role}</span>
        </figcaption>
      </figure>
    </Section>
  );
}
