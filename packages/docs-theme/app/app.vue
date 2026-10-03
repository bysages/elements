<script setup lang="ts">
import tokens from "@bysages/tokens";
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
const { locale, isEnabled, t } = useDocsI18n();
const collectionName = computed(() =>
  isEnabled.value ? (`docs_${locale.value.replace("-", "_")}` as keyof Collections) : "docs",
);

// The key rides the collection: each shelf keeps its own payload entry,
// so switching back to a locale the reader already visited resolves
// from cache instead of showing a half-fetched tree. The previous tree
// stays on screen while the new shelf loads — a bare refresh would
// flash the lane empty for the length of the query.
const { data: tree } = await useAsyncData(
  () => `docs-nav:${collectionName.value}`,
  () => queryCollectionNavigation(collectionName.value),
  { watch: [collectionName], keepPreviousData: true },
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

const colorTokens = tokens as Record<string, string>;
const themeColor = useState("docs-theme-color", () => colorTokens["bs-color-gray-50"]);
const route = useRoute();

let themeObserver: MutationObserver | undefined;

// The browser color must be concrete, while the shell’s paper is a themed
// custom property; read it back from the painted body on every theme
// attribute change so scenes and modes stay in sync with the browser chrome.
function syncThemeColor() {
  themeColor.value = getComputedStyle(document.body).backgroundColor;
}

function markMainContent() {
  const main = document.querySelector<HTMLElement>("main.bs-docs-main");
  if (!main) return;
  main.id = "main-content";
  main.tabIndex = -1;
}

onMounted(() => {
  markMainContent();
  syncThemeColor();
  themeObserver = new MutationObserver(syncThemeColor);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-contrast", "data-density", "data-scene", "data-accent"],
  });
});

watch(
  () => route.fullPath,
  () => {
    nextTick(markMainContent);
  },
);

onBeforeUnmount(() => {
  themeObserver?.disconnect();
  themeObserver = undefined;
});

useHead({
  meta: [{ name: "theme-color", content: themeColor }],
});

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
    <a class="bs-docs-skip-link" href="#main-content">{{ t("docs.skipToContent") }}</a>
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
