import { Fira_Code, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Only in small labels (addresses, tech names), so not preloaded: it would
// compete with the hero image for bandwidth on every page.
export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-fira-code",
});

export const fontVariables = [inter.variable, firaCode.variable].join(" ");
