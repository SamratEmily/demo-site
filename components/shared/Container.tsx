import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  /** `narrow` (720px) for long-form text; `default` (1152px) for layouts. */
  size?: "default" | "narrow";
  className?: string;
}

export function Container({ children, size = "default", className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" ? "max-w-content" : "max-w-narrow",
        className,
      )}
    >
      {children}
    </div>
  );
}
