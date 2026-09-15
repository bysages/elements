<script setup lang="ts">
import { NavigationMenu } from "@bysages/vue";
import { computed, inject, ref, type Ref } from "vue";

interface NavItem {
  title: string;
  path?: string;
  children?: NavItem[];
}

/** Docus's sidebar: the whole tree, or — when the sections live in the
 * header — only the active section's children. The reference shelf is a
 * top-level group of the same tree, so it needs no second channel. */
const { sidebarNavigation } = useSubNavigation();

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const props = defineProps<{
  /** Render the whole tree regardless of the sub-navigation mode — the
   * mobile drawer, where narrowing to the active section would leave the
   * other sections unreachable. */
  full?: boolean;
}>();

const rows = computed<NavItem[]>(() =>
  props.full ? (navigation.value ?? []) : sidebarNavigation.value,
);

const { Root, List } = NavigationMenu;
</script>

<template>
  <Root orientation="vertical" aria-label="Documents" class="bs-docs-nav">
    <List>
      <DocsNavItem v-for="row in rows" :key="row.path ?? row.title" :item="row" />
    </List>
  </Root>
</template>
