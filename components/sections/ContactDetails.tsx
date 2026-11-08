import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { settings, whatsappLink } from "@/lib/settings";

interface DetailRow {
  key: string;
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

const linkClass =
  "inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4 hover:no-underline focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none break-all";
const iconClass = "mt-0.5 size-5 shrink-0 text-primary";

/** Contact details from content/settings.json. Returns null when none are set. */
export function ContactDetails() {
  const t = useTranslations();
  const locale = useLocale();
  const { email, phone, address, officeHours, mapEmbedUrl } = settings.contact;
  const whatsapp = whatsappLink(settings.whatsapp.greeting[locale]);

  const candidates: (DetailRow | false)[] = [
    !!email && {
      key: "email",
      icon: <Mail className={iconClass} aria-hidden />,
      label: t("footer.email"),
      value: (
        <a href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>
      ),
    },
    !!phone && {
      key: "phone",
      icon: <Phone className={iconClass} aria-hidden />,
      label: t("footer.phone"),
      value: (
        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
          {phone}
        </a>
      ),
    },
    !!whatsapp && {
      key: "whatsapp",
      icon: <BrandIcon name="whatsapp" className={iconClass} />,
      label: t("contact.whatsapp"),
      value: (
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t("contact.chatOnWhatsapp")}
          <span className="sr-only"> ({t("common.externalLink")})</span>
        </a>
      ),
    },
    !!address[locale] && {
      key: "address",
      icon: <MapPin className={iconClass} aria-hidden />,
      label: t("footer.address"),
      value: <address className="not-italic">{address[locale]}</address>,
    },
    !!officeHours[locale] && {
      key: "hours",
      icon: <Clock className={iconClass} aria-hidden />,
      label: t("footer.officeHours"),
      value: officeHours[locale],
    },
  ];
  const rows = candidates.filter((row): row is DetailRow => row !== false);
  if (rows.length === 0 && !mapEmbedUrl) return null;

  return (
    <section aria-labelledby="contact-details-title">
      <h2 id="contact-details-title" className="text-h3">
        {t("contact.detailsTitle")}
      </h2>
      {rows.length > 0 ? (
        <dl className="mt-6 flex flex-col">
          {rows.map((row) => (
            <div key={row.key} className="flex gap-4 border-t py-4">
              {row.icon}
              <div className="min-w-0">
                <dt className="text-sm text-muted-foreground">{row.label}</dt>
                <dd className="mt-1">{row.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      ) : null}
      {mapEmbedUrl ? (
        <iframe
          src={mapEmbedUrl}
          title={t("contact.mapTitle")}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-6 aspect-[4/3] w-full rounded-lg border bg-surface-muted"
        />
      ) : null}
    </section>
  );
}
