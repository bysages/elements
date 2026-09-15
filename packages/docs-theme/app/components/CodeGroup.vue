<script setup lang="ts">
import { Tabs } from "@bysages/vue";

const slots = useSlots();

// Each child is a ProsePre vnode; its filename (from the ```lang [Label]
// meta) or language names the tab. Non-component vnodes are skipped.
const items = computed(() =>
  (slots.default?.() ?? [])
    .filter((v) => typeof v.type === "object")
    .map((v) => ({
      label:
        (v.props?.filename as string | undefined) ??
        (v.props?.language as string | undefined) ??
        "code",
      vnode: v,
    })),
);
</script>

<template>
  <Tabs.Root class="bs-docs-code-group" :default-value="items[0]?.label">
    <Tabs.List>
      <Tabs.Trigger v-for="(item, i) in items" :key="i" :value="item.label">
        {{ item.label }}
      </Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Content v-for="(item, i) in items" :key="i" :value="item.label">
      <component :is="item.vnode" />
    </Tabs.Content>
  </Tabs.Root>
</template>
