<script setup lang="ts">
import { Toc } from "@bysages/vue";

interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

const props = defineProps<{
  page?: { body?: { toc?: { links?: TocLink[] } } } | null;
}>();

const app = useAppConfig();
const { t } = useDocsI18n();

/** The machine wants a flat list: `value` is the heading id it watches,
 * `depth` drives the indent, and the label rides along for rendering. */
const items = computed(() => {
  const flat: Array<{ value: string; depth: number; label: string }> = [];
  const walk = (links: TocLink[]) => {
    for (const link of links) {
      flat.push({ value: link.id, depth: link.depth, label: link.text });
      walk(link.children ?? []);
    }
  };
  walk(props.page?.body?.toc?.links ?? []);
  return flat;
});

const { Root, Nav, Title, List, Indicator, Item, Link } = Toc;
</script>

<template>
  <Root v-if="items.length" :items="items">
    <Nav>
      <Title>{{ app.docs.toc?.title ?? t("docs.toc") }}</Title>
      <List>
        <Indicator />
        <Item v-for="item in items" :key="item.value" :item="item">
          <Link :href="`#${item.value}`">{{ item.label }}</Link>
        </Item>
      </List>
    </Nav>
  </Root>
</template>
