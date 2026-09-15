<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import { computed } from "vue";

const app = useAppConfig() as {
  docs?: { name?: string; description?: string };
  seo?: { titleTemplate?: string; title?: string; description?: string };
};

const name = app.seo?.title ?? app.docs?.name ?? "Docs";
const description = app.seo?.description ?? app.docs?.description;

// The navigation follows the reader's shelf: one docs collection per
// locale under i18n, the single collection otherwise.
const { locale, isEnabled } = useDocsI18n();
const collectionName = computed(() =>
  isEnabled.value ? (`docs_${locale.value.replace("-", "_")}` as keyof Collections) : "docs",
);

// The key rides the collection: each shelf keeps its own payload entry,
// so switching back to a locale the reader already visited resolves
// from cache instead of showing a half-fetched tree.
const { data: tree } = await useAsyncData(
  () => `docs-nav:${collectionName.value}`,
  () => queryCollectionNavigation(collectionName.value),
  { watch: [collectionName] },
);

// The locale prefix mounts every collection under one ghost folder;
// readers never see that shelf itself, so it dissolves here.
const navigation = computed(() => {
  const items = tree.value ?? [];
  return items.length === 1 && items[0]!.path === `/${locale.value}`
    ? (items[0]!.children ?? [])
    : items;
});

provide("navigation", navigation);

useSeoMeta({
  titleTemplate: app.seo?.titleTemplate ?? `%s · ${name}`,
  title: name,
  description,
  ogSiteName: name,
});

// The document declares its language for the reader's agent and screen
// reader — the i18n ref tracks the shelf the reader is on.
useHead({
  htmlAttrs: { lang: () => (isEnabled.value ? locale.value : undefined) },
});
</script>

<template>
  <!-- Navigation progress as a hairline of ink across the top of the page. -->
  <NuxtLoadingIndicator color="var(--bs-color-primary)" :height="2" />
  <div class="bs-docs">
    <AppHeader v-if="$route.meta.header !== false" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AppFooter v-if="$route.meta.footer !== false" />

    <ClientOnly>
      <AssistantFloatingInput />
      <AssistantPanel />
    </ClientOnly>
  </div>
</template>
