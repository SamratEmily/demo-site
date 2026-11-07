"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeaderShellProps {
  children: ReactNode;
}

/**
 * Sticky header that turns solid with a border once the page scrolls.
 * Height stays fixed so nothing below shifts.
 */
export function HeaderShell({ children }: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      {children}
    </header>
  );
}
