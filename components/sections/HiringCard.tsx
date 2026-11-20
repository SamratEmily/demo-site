import { ArrowRight, UserRoundPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { careersHref } from "@/content/navigation";

interface HiringCardProps {
  /** Number of open positions (callers show the card only when there are some). */
  openings: number;
}

/**
 * The last card in the team row: links to Careers while positions are open.
 * Same footprint as a team member, with an icon in place of a photo.
 */
export function HiringCard({ openings }: HiringCardProps) {
  const t = useTranslations("careers");

  return (
    <Link
      href={careersHref}
      className="group block rounded-lg focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <span
        aria-hidden
        className="flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 text-primary transition-colors group-hover:border-primary group-hover:bg-primary/10"
      >
        <UserRoundPlus className="size-12" />
      </span>
      <span className="mt-4 flex items-center gap-1.5 font-semibold text-primary">
        {t("hiringTitle")}
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </span>
      <span className="block text-muted-foreground">
        {t("hiringOpenings", { count: openings })}
      </span>
    </Link>
  );
}
