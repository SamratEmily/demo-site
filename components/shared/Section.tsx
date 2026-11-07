import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

const tones = {
  default: "bg-background",
  muted: "bg-surface-muted",
  deep: "surface-deep",
} as const;

interface SectionProps {
  children: ReactNode;
  /** Id of the heading that names this section (for screen readers). */
  labelledBy: string;
  tone?: keyof typeof tones;
  /** Container width; pass `false` for full-bleed content. */
  container?: "default" | "narrow" | false;
  className?: string;
}

export function Section({
  children,
  labelledBy,
  tone = "default",
  container = "default",
  className,
}: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={cn("py-16 lg:py-24", tones[tone], className)}>
      {container ? <Container size={container}>{children}</Container> : children}
    </section>
  );
}
