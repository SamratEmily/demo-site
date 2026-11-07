import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  children: ReactNode;
  /** Shown in the address bar, e.g. "garibecho.com". */
  address?: string;
  className?: string;
}

/** A plain browser-window frame for real product screenshots. */
export function BrowserFrame({ children, address, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-2xl shadow-brand-navy/20",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-3 border-b bg-muted px-3" aria-hidden>
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        {address ? (
          <span className="truncate font-mono text-xs text-muted-foreground">{address}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
