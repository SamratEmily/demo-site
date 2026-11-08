import { useLocale, useTranslations } from "next-intl";
import type { ProcessStep } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";

interface NumberedStepsProps {
  steps: ProcessStep[];
  /** Columns on large screens. */
  columns?: 3 | 4;
  className?: string;
}

/** A real sequence, so it is numbered (CLAUDE.md §8). */
export function NumberedSteps({ steps, columns = 3, className }: NumberedStepsProps) {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <ol
      className={cn(
        "grid gap-x-12 gap-y-10 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4 lg:gap-x-8",
        className,
      )}
    >
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <li key={step.title.en} className="relative border-t-2 border-primary/25 pt-5">
            <span aria-hidden className="absolute -top-0.5 left-0 h-0.5 w-12 bg-primary" />
            <p className="font-mono text-sm font-medium text-primary">
              <span className="sr-only">{t("stepLabel", { number })}</span>
              <span aria-hidden>{formatNumber(number, locale, { minimumIntegerDigits: 2 })}</span>
            </p>
            <h3 className="mt-2 text-h3">{step.title[locale]}</h3>
            <p className="mt-2 text-muted-foreground">{step.description[locale]}</p>
          </li>
        );
      })}
    </ol>
  );
}
