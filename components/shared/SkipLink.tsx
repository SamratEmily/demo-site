import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("common");

  return (
    <a
      href="#main"
      className="sr-only rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center"
    >
      {t("skipToContent")}
    </a>
  );
}
