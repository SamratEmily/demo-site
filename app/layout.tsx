import type { ReactNode } from "react";

// The real <html>/<body> live in app/[locale]/layout.tsx so `lang` can be set
// per locale. This pass-through exists because app/page.tsx and
// app/not-found.tsx sit outside the [locale] segment.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
