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

const { t } = useDocsI18n();

const { Root, Trigger, Backdrop, Positioner, Content, Title } = Drawer;

const links = computed(() => props.page?.body?.toc?.links ?? []);
const tocTitleId = useId();
</script>

<template>
  <!-- Below the wide-container breakpoint the outline lane is folded
       away; the bar carries its entry instead. -->
  <Root>
    <div v-if="links.length" class="bs-docs-mobile-bar">
      <Trigger as-child>
        <Button variant="ghost" size="sm">
          <Icon name="i-lucide-list-tree" class="size-4" />
          {{ t("docs.toc") }}
        </Button>
      </Trigger>
    </div>

    <ClientOnly>
      <!-- The outline rises from the bottom edge too — one gesture
         vocabulary for every sheet on the phone. -->
      <Backdrop />
      <Positioner>
        <Content :aria-label="t('docs.toc')" class="bs-docs-toc-drawer">
          <Title :id="tocTitleId">{{ t("docs.toc") }}</Title>
          <DocsAsideRight :page="page" hide-title :title-id="tocTitleId" />
        </Content>
      </Positioner>
    </ClientOnly>
  </Root>
</template>
