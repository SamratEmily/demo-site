"use client";

import { useTranslations } from "next-intl";
import { mainNav } from "@/content/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface MainNavProps {
  /** `bar` for the desktop header, `stack` for the mobile menu. */
  layout: "bar" | "stack";
  /** Called after a link is chosen (closes the mobile menu). */
  onNavigate?: () => void;
}

export function MainNav({ layout, onNavigate }: MainNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")}>
      <ul className={cn(layout === "bar" ? "flex items-center gap-1" : "flex flex-col")}>
        {mainNav.map(({ labelKey, href }) => {
          const isCurrent = pathname === href;
          const isSection = isCurrent || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "flex min-h-11 min-w-11 items-center font-medium transition-colors",
                  "focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
                  layout === "bar"
                    ? "justify-center rounded-lg px-3 text-sm text-muted-foreground hover:text-foreground"
                    : "min-h-12 border-b px-1 text-lg hover:text-primary",
                  isSection && "text-foreground",
                  isSection &&
                    layout === "bar" &&
                    "underline decoration-brand-cyan decoration-2 underline-offset-[10px]",
                )}
              >
                {t(labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
