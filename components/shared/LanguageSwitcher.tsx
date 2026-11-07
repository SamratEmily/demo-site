"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** `short` shows EN | বাং (header); `full` shows English | বাংলা (mobile menu). */
  labels?: "short" | "full";
  className?: string;
}

const fullLabelKey = { en: "enFull", bn: "bnFull" } as const;

/** Segmented EN | বাং control. Keeps the visitor on the same page. */
export function LanguageSwitcher({ labels = "short", className }: LanguageSwitcherProps) {
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
            href={pathname}
            locale={locale}
            lang={locale}
            hrefLang={locale}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={labels === "short" ? t(fullLabelKey[locale]) : undefined}
            className={cn(
              "inline-flex min-h-10 min-w-11 flex-1 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
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
