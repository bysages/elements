<script setup lang="ts">
import { createListCollection, Select } from "@bysages/vue";
import { ref } from "vue";

const collection = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

const value = ref("vue");
</script>

<template>
  <Select.Root v-model="value" :collection="collection">
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select" />
      </Select.Trigger>
      <Select.ClearTrigger>✕</Select.ClearTrigger>
      <Select.Indicator>╍</Select.Indicator>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
          <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
            <Select.ItemText>{{ item.label }}</Select.ItemText>
            <Select.ItemIndicator>✓</Select.ItemIndicator>
          </Select.Item>
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
</template>
