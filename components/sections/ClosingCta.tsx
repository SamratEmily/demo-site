import { useLocale, useTranslations } from "next-intl";
import { home } from "@/content/home";
import { quoteHref } from "@/content/navigation";
import { CtaPanel } from "./CtaPanel";

/** Home page closing call to action. */
export function ClosingCta() {
  const t = useTranslations("header");
  const locale = useLocale();

  return (
    <CtaPanel
      id="cta-title"
      title={home.cta.title[locale]}
      body={home.cta.intro?.[locale]}
      action={{ href: quoteHref, label: t("getQuote") }}
    />
  );
}
