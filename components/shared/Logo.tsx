import { cn } from "@/lib/utils";
import { LighthouseMark } from "./LighthouseMark";

interface LogoProps {
  className?: string;
}

/**
 * Beacon Soft Ltd. logo: lighthouse mark + "Beacon Soft Ltd." wordmark,
 * matching the brand avatar. Decorative; the wrapping link carries the accessible name.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LighthouseMark className="size-9" />
      <span className="text-[1.1875rem] leading-none tracking-[-0.01em] whitespace-nowrap">
        <span className="font-bold">Beacon</span>{" "}
        <span className="font-light text-wordmark-accent">Soft Ltd.</span>
      </span>
    </span>
  );
}
