<script setup lang="ts">
import { Listbox, createListCollection } from "@bysages/vue";

const pigments = createListCollection({
  items: [
    { label: "Qinghua cobalt", value: "qinghua" },
    { label: "Celadon", value: "celadon" },
    { label: "Zhusha cinnabar", value: "zhusha" },
    { label: "Ochre", value: "ochre" },
  ],
});
</script>

<template>
  <Listbox.Root :collection="pigments" selection-mode="single">
    <Listbox.Label>Accent</Listbox.Label>
    <Listbox.Content>
      <Listbox.Item v-for="item in pigments.items" :key="item.value" :item="item">
        <Listbox.ItemText>{{ item.label }}</Listbox.ItemText>
        <Listbox.ItemIndicator>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 8.5l2.5 2.5L12 5.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Listbox.ItemIndicator>
      </Listbox.Item>
    </Listbox.Content>
  </Listbox.Root>
</template>
