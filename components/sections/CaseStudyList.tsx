import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { caseStudyHref } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyFacts } from "./CaseStudyFacts";

interface CaseStudyListProps {
  studies: CaseStudy[];
}

/** Case studies as full-width rows: the story first, the facts underneath. */
export function CaseStudyList({ studies }: CaseStudyListProps) {
  const t = useTranslations("caseStudies");

  return (
    <ul className="border-b">
      {studies.map(({ slug, meta }) => (
        <li key={slug} className="border-t">
          <article className="group relative py-10 hover:bg-surface-muted sm:-mx-4 sm:px-4">
            <h2 className="max-w-3xl text-h2">
              <Link
                href={caseStudyHref(slug)}
                className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-3 focus-visible:after:ring-ring"
              >
                {meta.title}
              </Link>
            </h2>
            <p className="mt-4 max-w-2xl text-lead text-muted-foreground">{meta.summary}</p>
            <CaseStudyFacts meta={meta} linkProduct={false} className="mt-8 max-w-3xl" />
            <p aria-hidden className="mt-8 inline-flex items-center gap-2 font-medium text-primary">
              {t("read")}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
