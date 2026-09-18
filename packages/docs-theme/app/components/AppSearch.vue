<script setup lang="ts">
import { Button, Command, type CommandEntry } from "@bysages/vue";
import type { PageCollections } from "@nuxt/content";
import MiniSearch from "minisearch";
import { computed, ref, watch } from "vue";

interface SearchSection {
  id: string;
  title: string;
  titles: string[];
  level: number;
  content: string;
}

const { t, isEnabled, localeOf } = useDocsI18n();
const route = useRoute();

// The rail's square trigger shares this state — the palette is opened
// from the header's field or its folded trigger alike.
const open = useDocsSearch();
const query = ref("");

// One collection per locale, mirroring content.config.ts. The query runs
// client-side against Content's bundled database — no server route, so
// static hosting searches exactly like a node deployment.
const collectionName = computed(
  () => (isEnabled.value ? `docs_${localeOf(route.path)}` : "docs") as keyof PageCollections,
);

const { data: sections } = useLazyAsyncData(
  `search_${collectionName.value}`,
  () => queryCollectionSearchSections(collectionName.value),
  { server: false, watch: [collectionName] },
);

const engine = computed(() => {
  const mini = new MiniSearch<SearchSection>({
    fields: ["title", "titles", "content"],
    storeFields: ["id", "title", "titles", "level"],
    searchOptions: { fuzzy: 0.2, prefix: true, boost: { title: 3 } },
  });
  mini.addAll(sections.value ?? []);
  return mini;
});

// No query turns the palette into a page picker; otherwise the best
// section per page wins — one row per destination, its shelf the group
// heading above it.
const items = computed<CommandEntry[]>(() => {
  const list = sections.value ?? [];
  const rows: Array<SearchSection | string> = !query.value.trim()
    ? list.filter((s) => s.level <= 1)
    : engine.value.search(query.value).map((hit) => hit.id);

  const seen = new Map<string, SearchSection>();
  for (const row of rows) {
    const section =
      typeof row === "string"
        ? (engine.value.getStoredFields(row) as unknown as SearchSection)
        : row;
    if (!section) continue;
    const path = section.id.split("#")[0]!;
    if (!seen.has(path)) seen.set(path, section);
  }

  return [...seen.values()].slice(0, 12).map((section) => ({
    value: section.id,
    label: section.title,
    group:
      section.titles.length > 1
        ? section.titles.slice(0, -1).join(" › ")
        : section.id.split("#")[0]!,
  }));
});

watch(open, (isOpen) => {
  if (isOpen) query.value = "";
});

function pick(value: string) {
  open.value = false;
  navigateTo(value);
}

function onKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    open.value = !open.value;
  }
}

if (import.meta.client) {
  window.addEventListener("keydown", onKeydown);
  onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
}
</script>

<template>
  <!-- The trigger poses as a field; the palette itself is the Command
       component — its sheet, ledger and keycap hints carry the rest. -->
  <Button variant="ghost" size="sm" class="bs-docs-search-trigger" @click="open = true">
    <Icon name="i-lucide-search" />
    <span>{{ t("docs.search") }}</span>
    <kbd>⌘K</kbd>
  </Button>
  <Command
    :items="items"
    :open="open"
    :auto-filter="false"
    :input-value="query"
    :empty-text="sections ? t('docs.searchEmpty') : t('docs.searchLoading')"
    :placeholder="t('docs.search')"
    @update:open="open = $event"
    @update:input-value="query = $event ?? ''"
    @select="pick"
  />
</template>
