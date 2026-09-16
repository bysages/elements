import {
  defineArticle,
  defineBreadcrumb,
  defineOrganization,
  defineWebSite,
} from "nuxt-schema-org/schema";
import { useHead, useRoute, useRuntimeConfig, useSeoMeta } from "nuxt/app";
import { joinURL, withoutTrailingSlash } from "ufo";
import type { MaybeRefOrGetter } from "vue";
import { computed, toValue } from "vue";

import { useDocsI18n } from "./useDocsI18n";

export interface SeoBreadcrumb {
  title: string;
  path: string;
}

export interface UseSeoOptions {
  title?: MaybeRefOrGetter<string | undefined>;
  description?: MaybeRefOrGetter<string | undefined>;
  /** `og:type` — docs pages are articles, the landing is a website. */
  type?: MaybeRefOrGetter<"website" | "article">;
  /** Breadcrumb trail, emitted as a `BreadcrumbList` node on articles. */
  breadcrumbs?: MaybeRefOrGetter<SeoBreadcrumb[] | undefined>;
  /** The organization behind the site, emitted on the landing page. */
  organization?: { name: string; url?: string; logo?: string };
}

/** The theme's one SEO setup: meta tags, a canonical link beside its
 * markdown twin (the `.md` URL agent discovery advertises), hreflang
 * alternates under i18n, and JSON-LD through `nuxt-schema-org`. */
export function useSeo(options: UseSeoOptions = {}) {
  const route = useRoute();
  const i18n = useDocsI18n();
  const siteUrl = useSiteConfig().url;

  const title = computed(() => toValue(options.title));
  const description = computed(() => toValue(options.description));
  const type = computed(() => toValue(options.type) ?? "article");

  const baseUrl = siteUrl ? withoutTrailingSlash(siteUrl) : "";
  const canonicalUrl = baseUrl ? joinURL(baseUrl, route.path) : undefined;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonicalUrl,
    ogLocale: computed(() => (i18n.isEnabled.value ? i18n.locale.value : undefined)),
  });

  // The canonical page and its markdown twin as an alternate
  // representation; at the site root only the raw document exists. The
  // raw prefix follows agent discovery's config so an override keeps
  // the twin in sync.
  const rawPrefix =
    (useRuntimeConfig().public as { agentDiscovery?: { rawPrefix?: string } }).agentDiscovery
      ?.rawPrefix || "/raw";
  useHead({
    link: [
      { rel: "canonical" as const, href: canonicalUrl },
      ...(baseUrl
        ? [
            {
              rel: "alternate" as const,
              type: "text/markdown",
              href:
                route.path === "/"
                  ? `${baseUrl}${rawPrefix}/index.md`
                  : `${baseUrl}${route.path}.md`,
            },
          ]
        : []),
    ],
  });

  // Hreflang alternates when the site speaks more than one language —
  // plus the x-default for readers no locale matches.
  useHead({
    link: computed(() => {
      if (!i18n.isEnabled.value || !baseUrl) return [];
      const alternates = i18n.locales.value
        .map((l) => ({ code: l.code, path: i18n.switchLocalePath(l.code) }))
        .filter((l) => l.path)
        .map((l) => ({
          rel: "alternate" as const,
          hreflang: l.code,
          href: joinURL(baseUrl, l.path),
        }));
      const fallback = i18n.switchLocalePath(i18n.locales.value[0]?.code ?? "en");
      return fallback
        ? [
            ...alternates,
            { rel: "alternate" as const, hreflang: "x-default", href: joinURL(baseUrl, fallback) },
          ]
        : alternates;
    }),
  });

  // Schema.org nodes take plain values (they resolve once), so the
  // computeds are unwrapped here.
  const nodes = [
    ...(type.value === "article"
      ? [
          defineArticle({
            "@type": "TechArticle",
            headline: title.value ?? route.path,
            description: description.value,
          }),
          defineBreadcrumb({
            itemListElement: (toValue(options.breadcrumbs) ?? []).map((item, index) => ({
              "@type": "ListItem",
              "@id": joinURL(baseUrl, item.path),
              position: index + 1,
              name: item.title,
              item: joinURL(baseUrl, item.path),
            })),
          }),
        ]
      : [
          defineWebSite({ name: title.value ?? "Docs", description: description.value }),
          ...(options.organization?.name
            ? [
                defineOrganization({
                  name: options.organization.name,
                  url: options.organization.url,
                  logo: options.organization.logo,
                }),
              ]
            : []),
        ]),
  ];

  useSchemaOrg(nodes);
}
