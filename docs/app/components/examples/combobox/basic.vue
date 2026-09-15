<script setup lang="ts">
import { useListCollection } from "@ark-ui/vue/combobox";
import { useFilter } from "@ark-ui/vue/locale";
import { Combobox } from "@bysages/vue";

const filters = useFilter({ sensitivity: "base" });
const { collection, filter } = useListCollection({
  initialItems: [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
    { label: "Elderberry", value: "elderberry" },
    { label: "Fig", value: "fig" },
  ],
  filter: (item: string, inputValue: string) => filters.value.contains(item, inputValue),
});
</script>

<template>
  <Combobox.Root :collection="collection" @input-value-change="(e) => filter(e.inputValue)">
    <Combobox.Label>Fruit</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input placeholder="e.g. Apple" />
      <Combobox.ClearTrigger>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </Combobox.ClearTrigger>
      <Combobox.Trigger>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Combobox.Trigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No results found</Combobox.Empty>
          <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item">
            <Combobox.ItemText>{{ item.label }}</Combobox.ItemText>
            <Combobox.ItemIndicator>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
