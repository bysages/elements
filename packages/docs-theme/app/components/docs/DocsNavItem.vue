<script setup lang="ts">
import { Collapsible, NavigationMenu } from "@bysages/vue";
import { computed } from "vue";

interface NavItem {
  title: string;
  path?: string;
  icon?: string;
  children?: NavItem[];
}

defineProps<{ item: NavItem }>();

const { Root, List, Item, Link } = NavigationMenu;
const route = useRoute();
const routePath = computed(() => route.path);
</script>

<template>
  <!-- A folder folds: the title row toggles its branch. Every branch
       arrives open — the sidebar is a shelf to scan, not a gate to
       open group by group. Folders carry the shelf's landing path
       too — children, not the path, make it a folder. -->
  <li v-if="item.children?.length" class="bs-docs-nav-branch">
    <Collapsible.Root default-open>
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
  <Item v-else :value="item.path!">
    <Link as-child :current="routePath === item.path">
      <NuxtLink :to="item.path!">{{ item.title }}</NuxtLink>
    </Link>
  </Item>
</template>
