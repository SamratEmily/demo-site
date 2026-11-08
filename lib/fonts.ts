import { Fira_Code, Hind_Siliguri, Inter } from "next/font/google";

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

// Bangla font: used only on /bn (see html:lang(bn) in globals.css), so English
// pages never download it. Not preloaded, because next/font would preload it on
// every locale; /bn requests it as soon as the CSS is parsed. Two weights only:
// 400 for text and 600 for headings (500 and 700 render with the nearest).
export const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
  variable: "--font-hind-siliguri",
});

export const fontVariables = [inter.variable, firaCode.variable, hindSiliguri.variable].join(" ");
