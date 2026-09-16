import { useNuxtApp, useRuntimeConfig } from "nuxt/app";
import type { Ref } from "vue";
import { computed, ref } from "vue";

type DocsNuxtApp = ReturnType<typeof useNuxtApp> & {
  $i18n?: {
    locale: Ref<string>;
    t: (key: string) => string;
    tm: (key: string) => unknown;
    rt: (message: unknown) => string;
  };
  /* @nuxtjs/i18n hangs its routing helpers on the app, not on $i18n. */
  $localePath?: (path: string) => string;
  $switchLocalePath?: (locale: string) => string;
  $docsLocale?: string;
  $docsMessages?: Record<string, unknown>;
};

type LocaleOption = { code: string; name?: string };

/** One i18n surface for the whole theme, mirroring Docus: when the
 * consumer registers `@nuxtjs/i18n` it drives everything; otherwise the
 * fallback plugin provides a single locale from `app.config.docs.locale`
 * and every call degrades to a passthrough. */
export const useDocsI18n = () => {
  const config = useRuntimeConfig().public;
  const nuxtApp = useNuxtApp() as DocsNuxtApp;
  const isEnabled = ref(!!config.i18n);

  if (!isEnabled.value) {
    const locale = nuxtApp.$docsLocale || "en";
    const messages = nuxtApp.$docsMessages || {};

    return {
      isEnabled,
      locale: ref(locale),
      localeOf: () => locale,
      locales: ref([] as LocaleOption[]),
      localePath: (path: string) => path,
      switchLocalePath: () => "",
      t: (key: string): string => {
        const segments = key.split(".");
        return segments.reduce(
          (acc: unknown, segment) => (acc as Record<string, unknown>)?.[segment],
          messages,
        ) as string;
      },
      tm: (key: string): unknown => {
        const segments = key.split(".");
        return segments.reduce(
          (acc: unknown, segment) => (acc as Record<string, unknown>)?.[segment],
          messages,
        );
      },
      /* Fallback messages are raw JSON, so a passthrough is exact. */
      rt: (message: unknown): string => (typeof message === "string" ? message : ""),
    };
  }

  // Content queries must read the locale off the URL at query time, not
  // from a cached computed or $i18n's ref: during a locale switch the
  // new page's setup runs while the transition still holds the old
  // route, and Nuxt skips its `_route` sync when only the language
  // segment changes. A plain function over the path it is handed keeps
  // every query honest — the locale is the path's first segment (i18n
  // folds it into per-locale route records, never a param); unknown
  // segments fall back to the i18n ref.
  const codes = ((config.i18n as { locales?: LocaleOption[] } | undefined)?.locales ?? []).map(
    (entry) => entry.code,
  );
  const localeOf = (path: string): string => {
    const segment = path.split("/")[1] ?? "";
    return codes.includes(segment) ? segment : nuxtApp.$i18n?.locale?.value || "en";
  };

  return {
    isEnabled,
    locale: nuxtApp.$i18n?.locale || ref("en"),
    localeOf,
    locales: ref(
      ((config.i18n as { locales?: LocaleOption[] } | undefined)?.locales ?? []) as LocaleOption[],
    ),
    t: nuxtApp.$i18n?.t || ((key: string) => key),
    tm:
      nuxtApp.$i18n?.tm ||
      ((key: string) =>
        key
          .split(".")
          .reduce((acc: unknown, segment) => (acc as Record<string, unknown>)?.[segment], {})),
    /* `tm` hands back compiled message values — for an array message
       each element is an AST/function, not the raw string. `rt`
       resolves one back; feeding it raw strings is also fine. */
    rt: nuxtApp.$i18n?.rt || ((message: unknown) => (typeof message === "string" ? message : "")),
    localePath: nuxtApp.$localePath || ((path: string) => path),
    switchLocalePath: nuxtApp.$switchLocalePath || (() => ""),
  };
};
