<script setup lang="ts">
import { Collapsible, NavigationMenu } from "@bysages/vue";
import { computed } from "vue";

interface NavItem {
  title: string;
  path?: string;
  icon?: string;
  children?: NavItem[];
}

const props = defineProps<{ item: NavItem }>();

const { Root, List, Item, Link } = NavigationMenu;
const route = useRoute();
const routePath = computed(() => route.path);

/** A branch holding the page under the reader's eye opens on arrival. */
function holds(item: NavItem, path: string): boolean {
  return item.path === path || !!item.children?.some((child) => holds(child, path));
}
const openByDefault = computed(() => holds(props.item, routePath.value));
</script>

<template>
  <!-- A folder folds: the title row toggles its branch, and the branch
       holding the reader's page arrives open. Folders carry the shelf's
       landing path too — children, not the path, make it a folder. -->
  <li v-if="item.children?.length" class="bs-docs-nav-branch">
    <Collapsible.Root :default-open="openByDefault">
      <Collapsible.Trigger class="bs-docs-nav-folder">
        <Icon v-if="item.icon" :name="item.icon" class="bs-docs-nav-folder-icon" />
        <span>{{ item.title }}</span>
        <Icon name="i-lucide-chevron-right" class="bs-docs-nav-chevron" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <ul class="bs-docs-nav-branch-list">
          <DocsNavItem
            v-for="child in item.children"
            :key="child.path ?? child.title"
            :item="child"
          />
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  </li>
  <Item v-else :value="item.path">
    <Link as-child :current="routePath === item.path">
      <NuxtLink :to="item.path!">{{ item.title }}</NuxtLink>
    </Link>
  </Item>
</template>
