import type { ContentIconName } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ContentIcon } from "./ContentIcon";

interface ProductArtProps {
  icon: ContentIconName;
  className?: string;
}

// Fixed star positions (percent) so the art is identical on every build.
const stars = [
  [8, 14],
  [17, 32],
  [26, 9],
  [38, 22],
  [47, 6],
  [58, 18],
  [66, 30],
  [74, 11],
  [83, 24],
  [91, 8],
  [12, 52],
  [88, 46],
  [34, 44],
  [70, 52],
  [52, 36],
] as const;

/**
 * Brand illustration for products that don't have screenshots yet: the night
 * sky and amber beam from the Beacon Soft covers, with the product's icon.
 * Decorative only — it never pretends to be a product screenshot.
 */
export function ProductArt({ icon, className }: ProductArtProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative isolate aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-b from-brand-blue to-brand-midnight",
        className,
      )}
    >
      <svg viewBox="0 0 100 62.5" className="absolute inset-0 size-full">
        {stars.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="0.35" className="fill-white/60" />
        ))}
      </svg>
      <div className="absolute top-[42%] left-1/2 h-24 w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,var(--beam)_30%,var(--beam)_70%,transparent)] [clip-path:polygon(0_0,50%_45%,100%_0,100%_100%,50%_55%,0_100%)]" />
      <div className="absolute top-[42%] left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-midnight shadow-[0_0_60px] ring-1 shadow-brand-amber/30 ring-white/15">
        <ContentIcon name={icon} className="size-10 text-brand-amber-light" />
      </div>
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-1/5 w-full"
      >
        <path
          d="M0 22 C70 8 140 34 210 20 S340 6 400 20 V60 H0z"
          className="fill-brand-stripe/25"
        />
        <path
          d="M0 38 C90 26 180 48 270 36 S370 28 400 36 V60 H0z"
          className="fill-brand-midnight"
        />
      </svg>
    </div>
  );
}
