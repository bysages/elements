<script setup lang="ts">
import { NavigationMenu } from "@bysages/vue";

/** The sections row Docus lifts into the header — one entry per top-level
 * folder (guide, components, reference), each opening on its first page. */
const { sections } = useSubNavigation();

const rows = computed(() => sections.value);

const { Root, List, Item, Link } = NavigationMenu;
</script>

<template>
  <div v-if="rows.length" class="bs-docs-header-bottom">
    <Root class="bs-docs-header-nav" aria-label="Sections">
      <List>
        <Item v-for="row in rows" :key="row.to" :value="row.to">
          <Link as-child :current="row.active">
            <NuxtLink :to="row.to">{{ row.label }}</NuxtLink>
          </Link>
        </Item>
      </List>
    </Root>
    <AppHeaderBottomRight />
  </div>
</template>
