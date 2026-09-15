<script setup lang="ts">
import { Button, Drawer } from "@bysages/vue";

interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

const props = defineProps<{
  /** The page's own toc links; the bar, like the outline lane, stays
   * out of the way when the page has no headings to offer. */
  page?: { body?: { toc?: { links?: TocLink[] } } } | null;
}>();

const open = ref(false);

const { t } = useDocsI18n();

const { Root, Backdrop, Positioner, Content, Title } = Drawer;

const links = computed(() => props.page?.body?.toc?.links ?? []);
</script>

<template>
  <!-- Below the wide-container breakpoint the outline lane is folded
       away; the bar carries its entry instead. -->
  <div v-if="links.length" class="bs-docs-mobile-bar">
    <Button variant="ghost" size="sm" @click="open = true">
      <Icon name="i-lucide-list-tree" class="bs-docs-rail-icon" />
      {{ t("docs.toc") }}
    </Button>
  </div>

  <ClientOnly>
    <!-- The outline rises from the bottom edge too — one gesture
         vocabulary for every sheet on the phone. -->
    <Root :open="open" @update:open="open = $event">
      <Backdrop />
      <Positioner>
        <Content aria-label="Table of contents">
          <Title>{{ t("docs.toc") }}</Title>
          <DocsAsideRight :page="page" />
        </Content>
      </Positioner>
    </Root>
  </ClientOnly>
</template>
