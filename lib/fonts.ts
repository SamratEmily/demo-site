import { Fira_Code, Hind_Siliguri, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

// Bangla font: applied only on /bn via the :lang(bn) rule in globals.css.
export const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind-siliguri",
});

export const fontVariables = [inter.variable, firaCode.variable, hindSiliguri.variable].join(" ");
