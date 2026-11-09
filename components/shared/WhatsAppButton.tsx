import { useTranslations } from "next-intl";
import { settings, whatsappLink } from "@/lib/settings";
import { BrandIcon } from "./BrandIcon";

/** Floating WhatsApp chat link. Renders nothing until a number is set in settings.json. */
export function WhatsAppButton() {
  const t = useTranslations();
  const href = whatsappLink(settings.whatsapp.greeting);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("whatsapp.label")} (${t("common.externalLink")})`}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-95 sm:right-6 sm:bottom-6"
    >
      <BrandIcon name="whatsapp" className="size-7" />
    </a>
  );
}
