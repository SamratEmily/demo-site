import { useTranslations } from "next-intl";
import type { ProductStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

/** "Live" (amber lamp, like the logo) or "In development". */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const t = useTranslations("product");
  const live = status === "live";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        live ? "text-foreground" : "text-muted-foreground",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          live
            ? "bg-brand-amber shadow-[0_0_0_3px] shadow-brand-amber/25"
            : "bg-muted-foreground/60",
        )}
      />
      {live ? t("statusLive") : t("statusInDevelopment")}
    </span>
  );
}
