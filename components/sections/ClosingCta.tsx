import { useTranslations } from "next-intl";
import { home } from "@/content/home";
import { quoteHref } from "@/content/navigation";
import { CtaPanel } from "./CtaPanel";

/** Home page closing call to action. */
export function ClosingCta() {
  const t = useTranslations("header");

  return (
    <CtaPanel
      id="cta-title"
      title={home.cta.title}
      body={home.cta.intro}
      action={{ href: quoteHref, label: t("getQuote") }}
    />
  );
}
