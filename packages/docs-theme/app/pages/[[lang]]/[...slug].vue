<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import { findPageHeadline } from "@nuxt/content/utils";
import { computed, inject, type Ref } from "vue";

definePageMeta({
  layout: "docs",
});

const route = useRoute();
const appConfig = useAppConfig() as {
  docs?: { name?: string };
  github?: { url?: string; branch?: string; rootDir?: string };
};
const { localeOf, isEnabled, t } = useDocsI18n();
const navigation =
  inject<Ref<Array<{ title: string; path?: string; children?: unknown[] }>>>("navigation");

// The docs collection is per-locale under i18n, read off the URL at
// query time — setup runs mid-transition, before refs settle.
const collectionName = () =>
  isEnabled.value ? (`docs_${localeOf(route.path).replace("-", "_")}` as keyof Collections) : "docs";

// Reactive keys: every path owns its own payload entry, so switching
// back to a visited page reads its cached data instead of refetching.
const [pageData, surroundData] = await Promise.all([
  useAsyncData(() => route.path, () => queryCollection(collectionName()).path(route.path).first()),
  useAsyncData(() => `surround:${route.path}`, () =>
    queryCollectionItemSurroundings(collectionName(), route.path, {
      fields: ["description"],
    }),
  ),
]);
const { data: page, refresh: refreshPage } = pageData;
const { data: surround, refresh: refreshSurround } = surroundData;

// A navigation that interrupts this page's first query leaves the entry
// reset to idle — no data, and it will not run on its own. Query once
// more before trusting the null.
if (!page.value) await refreshPage();
if (!surround.value) await refreshSurround();

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path));

// Walk the navigation tree along the path's segments — every branch that
// owns a real page is a breadcrumb. The locale prefix is not a shelf
// (the tree dissolves it), so the walk starts past it.
const breadcrumbs = computed(() => {
  const trail: Array<{ title: string; path: string }> = [];
  let level = navigation?.value;
  const localePrefix = isEnabled.value ? `/${localeOf(route.path)}` : "";
  let walked = localePrefix;
  const segments = route.path
    .split("/")
    .filter(Boolean)
    .slice(isEnabled.value ? 1 : 0);
  for (const segment of segments) {
    walked += `/${segment}`;
    const hit = level?.find((item) => item.path === walked);
    if (!hit?.path) break;
    trail.push({ title: hit.title, path: hit.path });
    level = hit.children as typeof level;
  }
  return trail;
});

const title = computed(() => page.value?.seo?.title || page.value?.title);
const description = computed(() => page.value?.seo?.description || page.value?.description);

useSeo({ title, description, breadcrumbs });

// "Edit this page" — the source file behind the rendered page, when the
// site declares its GitHub home.
const github = computed(() => appConfig.github ?? null);
const editLink = computed(() => {
  if (!github.value?.url) return undefined;
  const page_ = page.value as unknown as { stem?: string; extension?: string };
  return [
    github.value.url,
    "edit",
    github.value.branch,
    github.value.rootDir,
    "content",
    page_.stem && page_.extension ? `${page_.stem}.${page_.extension}` : undefined,
  ]
    .filter(Boolean)
    .join("/");
});

if (!page.value.seo?.ogImage) {
  defineOgImage("Docs", {
    headline: headline.value,
    title: title.value?.slice(0, 60),
    description: formatOgDescription(title.value, description.value),
  });
}
</script>

<template>
  <div>
    <!-- One element root: the out-in page transition animates the page's
         own root node and deadlocks on a fragment — a blank page between
         routes. The bar belongs to the lane, not the article, but it must
         live under the same root, and the remark must live inside it:
         since Vue 3.4 root-level comments stay in the render output and
         break the single-root check. -->
    <DocsAsideMobileBar :page="page" />
    <div class="bs-docs-article-grid">
      <article class="bs-docs-page">
        <DocsPageHeader :page="page" :headline="headline" />
        <ContentRenderer :value="page as Record<string, any>" class="bs-docs-prose" />
        <nav v-if="editLink" class="bs-docs-page-edit">
          <NuxtLink :to="editLink" target="_blank" rel="noopener">
            {{ t("docs.edit") }}
          </NuxtLink>
        </nav>
        <DocsSurround :surround="surround" />
      </article>
      <div class="bs-docs-toc">
        <DocsAsideRight :page="page" />
      </div>
    </div>
  </div>
</template>
