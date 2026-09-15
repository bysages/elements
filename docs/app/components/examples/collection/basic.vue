<script setup lang="ts">
import { createListCollection, Select } from "@bysages/vue";
import { ref } from "vue";

const collection = createListCollection({
  items: [
    { label: "Qinghua cobalt", value: "qinghua" },
    { label: "Celadon", value: "celadon" },
    { label: "Zhusha cinnabar", value: "zhusha" },
  ],
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});

const value = ref<string[]>(["celadon"]);
</script>

<template>
  <Select.Root :collection="collection" v-model="value">
    <Select.Label>Accent pigment</Select.Label>
    <Select.Trigger>
      <Select.ValueText placeholder="Pick a pigment" />
    </Select.Trigger>
    <Select.Positioner>
      <Select.Content>
        <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
          <Select.ItemText>{{ item.label }}</Select.ItemText>
          <Select.ItemIndicator>✓</Select.ItemIndicator>
        </Select.Item>
      </Select.Content>
    </Select.Positioner>
  </Select.Root>
</template>
