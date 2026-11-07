export { cn } from "cn";

/** "https://garibecho.com/path" → "garibecho.com" */
export function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}
