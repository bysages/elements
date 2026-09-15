<script setup lang="ts">
import { Button, Combobox, Dialog } from "@bysages/vue";
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

const open = ref(false);
const query = ref("");

// The index is client-only: the payload never rides the SSR html.
const { data: sections } = useFetch<SearchSection[]>("/api/search", {
  server: false,
  lazy: true,
});

const engine = computed(() => {
  const mini = new MiniSearch<SearchSection>({
    fields: ["title", "titles", "content"],
    storeFields: ["id", "title", "titles", "level"],
    searchOptions: { fuzzy: 0.2, prefix: true, boost: { title: 3 } },
  });
  mini.addAll(sections.value ?? []);
  return mini;
});

interface SearchItem {
  value: string;
  label: string;
  trail: string;
}

// No query turns the dialog into a page picker; otherwise the best
// section per page wins — one row per destination. The index carries
// every locale; the results only ever show the shelf the reader is on.
const items = computed<SearchItem[]>(() => {
  const list = sections.value ?? [];
  const rows: Array<SearchSection | string> = !query.value.trim()
    ? list.filter((s) => s.level <= 1)
    : engine.value.search(query.value).map((hit) => hit.id);

  const seen = new Map<string, SearchSection>();
  for (const row of rows) {
    const section =
      typeof row === "string" ? (engine.value.getStoredFields(row) as unknown as SearchSection) : row;
    if (!section) continue;
    // The shelf rides the URL's first segment, evaluated live — the
    // locale ref can trail a same-record language switch.
    if (isEnabled.value && !section.id.startsWith(`/${localeOf(route.path)}/`)) continue;
    const path = section.id.split("#")[0]!;
    if (!seen.has(path)) seen.set(path, section);
  }

  return [...seen.values()].slice(0, 12).map((section) => ({
    value: section.id,
    label: section.title,
    trail:
      section.titles.length > 1
        ? section.titles.slice(0, -1).join(" › ")
        : section.id.split("#")[0]!,
  }));
});

watch(open, (isOpen) => {
  if (isOpen) query.value = "";
});

// zag hands over the selection as the machine's value array.
function pick(details: { value?: string[] }) {
  const id = details.value?.[0];
  if (!id) return;
  open.value = false;
  navigateTo(id);
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
  <Dialog.Root :open="open" @update:open="open = $event">
    <Dialog.Trigger as-child>
      <Button variant="ghost" size="sm" class="bs-docs-search-trigger">
        <Icon name="i-lucide-search" />
        <span>{{ t("docs.search") }}</span>
        <kbd>⌘K</kbd>
      </Button>
    </Dialog.Trigger>
    <Dialog.Positioner class="bs-docs-search-positioner">
      <Dialog.Content class="bs-docs-search-panel">
        <Combobox.Root
          :items="items"
          :auto-filter="false"
          :open="true"
          :input-value="query"
          @value-change="pick"
          @update:input-value="query = $event ?? ''"
        >
          <Combobox.Control class="bs-docs-search-control">
            <Icon name="i-lucide-search" />
            <Combobox.Input :placeholder="t('docs.search')" />
          </Combobox.Control>
          <Combobox.Positioner class="bs-docs-search-combobox-positioner">
            <Combobox.Content class="bs-docs-search-combobox-content">
              <Combobox.Empty v-if="!items.length">{{ t("docs.searchEmpty") }}</Combobox.Empty>
              <Combobox.Item
                v-for="item in items"
                :key="item.value"
                :item="item"
                :value="item.value"
              >
                <Combobox.ItemText>{{ item.label }}</Combobox.ItemText>
                <span class="bs-docs-search-trail">{{ item.trail }}</span>
              </Combobox.Item>
            </Combobox.Content>
          </Combobox.Positioner>
        </Combobox.Root>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
