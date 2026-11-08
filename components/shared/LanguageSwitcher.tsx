"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** `short` shows EN | বাং (header); `full` shows English | বাংলা (mobile menu). */
  labels?: "short" | "full";
  className?: string;
}

interface SwitcherLinksProps extends LanguageSwitcherProps {
  /** Current query string, kept when switching (e.g. ?product=gari-becho). */
  query?: Record<string, string>;
}

const fullLabelKey = { en: "enFull", bn: "bnFull" } as const;

function SwitcherLinks({ labels = "short", className, query }: SwitcherLinksProps) {
  const t = useTranslations("language");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("inline-flex rounded-[10px] border p-0.5", className)}
    >
      {routing.locales.map((locale) => {
        const isCurrent = locale === current;
        const label = labels === "short" ? t(locale) : t(fullLabelKey[locale]);
        return (
          <Link
            key={locale}
            href={{ pathname, query }}
            locale={locale}
            lang={locale}
            hrefLang={locale}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={labels === "short" ? t(fullLabelKey[locale]) : undefined}
            className={cn(
              "inline-flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none",
              isCurrent
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

function SwitcherWithQuery(props: LanguageSwitcherProps) {
  const params = useSearchParams();
  const query = Object.fromEntries(params.entries());
  return <SwitcherLinks {...props} query={Object.keys(query).length > 0 ? query : undefined} />;
}

/**
 * Segmented EN | বাং control. Keeps the visitor on the same page, including
 * the query string. The static HTML renders links without the query; they
 * pick it up once the page loads (useSearchParams needs Suspense in a static export).
 */
export function LanguageSwitcher(props: LanguageSwitcherProps) {
  return (
    <Suspense fallback={<SwitcherLinks {...props} />}>
      <SwitcherWithQuery {...props} />
    </Suspense>
  );
}
