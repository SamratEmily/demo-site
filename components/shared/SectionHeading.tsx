import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const levels = {
  display: { tag: "h1", className: "text-display" },
  h1: { tag: "h1", className: "text-h1" },
  h2: { tag: "h2", className: "text-h2" },
  h3: { tag: "h3", className: "text-h3" },
} as const;

interface SectionHeadingProps {
  /** Used by <Section labelledBy> to name the section. */
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Visual size and semantic level together. Only one h1 per page. */
  level?: keyof typeof levels;
  className?: string;
}

export function SectionHeading({ id, title, intro, level = "h2", className }: SectionHeadingProps) {
  const { tag: Tag, className: sizeClass } = levels[level];

  return (
    <div className={cn("max-w-2xl", className)}>
      <Tag id={id} className={sizeClass}>
        {title}
      </Tag>
      {intro ? <p className="mt-4 text-lead text-muted-foreground">{intro}</p> : null}
    </div>
  );
}
