import { useId } from "react";
import { cn } from "@/lib/utils";

interface LighthouseMarkProps {
  className?: string;
  /** Draw the rounded midnight tile behind the lighthouse (app-icon style). */
  tile?: boolean;
}

/**
 * The Beacon Soft lighthouse, redrawn as SVG from the brand avatar
 * (Beacon/beacon-soft-avatar-with-name-500.png). Decorative: callers provide
 * the accessible name.
 */
export function LighthouseMark({ className, tile = true }: LighthouseMarkProps) {
  const id = useId();
  const beam = `${id}-beam`;
  const lantern = `${id}-lantern`;

  return (
    <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden focusable="false">
      <defs>
        <linearGradient id={beam} x1="0" x2="1">
          <stop offset="0" className="[stop-color:var(--brand-amber)]" stopOpacity="0" />
          <stop offset="1" className="[stop-color:var(--brand-amber)]" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${beam}-r`} x1="0" x2="1">
          <stop offset="0" className="[stop-color:var(--brand-amber)]" stopOpacity="0.9" />
          <stop offset="1" className="[stop-color:var(--brand-amber)]" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={lantern} x1="0" x2="1">
          <stop offset="0" className="[stop-color:var(--brand-amber-light)]" />
          <stop offset="1" className="[stop-color:var(--brand-amber)]" />
        </linearGradient>
      </defs>
      {tile ? <rect width="64" height="64" rx="14" className="fill-brand-midnight" /> : null}
      {/* Beams */}
      <path d="M32 20 5 12.5v15z" fill={`url(#${beam})`} />
      <path d="M32 20 59 12.5v15z" fill={`url(#${beam}-r)`} />
      {/* Lamp, roof, lantern, gallery */}
      <circle cx="32" cy="8.6" r="1.7" className="fill-brand-amber" />
      <path d="M32 10.4 26.4 16h11.2z" className="fill-white" />
      <rect x="27.6" y="16" width="8.8" height="8" rx="1" fill={`url(#${lantern})`} />
      <rect x="24" y="24.4" width="16" height="2.4" rx="1.2" className="fill-white" />
      {/* Tower with stripes */}
      <path d="M27 27h10l2.5 25h-15z" className="fill-white" />
      <path d="M26.35 33.5h11.3l.45 4.5h-12.2z" className="fill-brand-stripe" />
      <path d="M25.5 42h13l.45 4.5h-13.9z" className="fill-brand-stripe" />
      <path d="M29.6 52v-3.4a2.4 2.4 0 0 1 4.8 0V52z" className="fill-brand-midnight" />
      {/* Base */}
      <rect x="20" y="51.4" width="24" height="3" rx="1.5" className="fill-white" />
    </svg>
  );
}
