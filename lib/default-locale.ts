import { routing } from "@/i18n/routing";

/**
 * English pages live at the root (/about) instead of /en/about. The files in
 * app/(default)/ reuse the app/[locale]/ pages by passing them these props:
 * the same params, plus the default locale.
 */
export function withDefaultLocale<P extends object, Rest extends object>(
  props: Rest & { params: Promise<P> },
): Rest & { params: Promise<P & { locale: string }> } {
  return {
    ...props,
    params: props.params.then((params) => ({ ...params, locale: routing.defaultLocale })),
  };
}
