<script setup lang="ts">
import { useListCollection } from "@ark-ui/vue/combobox";
import { useFilter } from "@ark-ui/vue/locale";
import { check, chevron_down, x } from "@bysages/icons";
import { Combobox, Icon } from "@bysages/vue";

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
        <Icon :glyph="x" />
      </Combobox.ClearTrigger>
      <Combobox.Trigger>
        <Icon :glyph="chevron_down" />
      </Combobox.Trigger>
    </Combobox.Control>
    <Teleport to="body">
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No results found</Combobox.Empty>
          <Combobox.Item v-for="item in collection.items" :key="item.value" :item="item">
            <Combobox.ItemText>{{ item.label }}</Combobox.ItemText>
            <Combobox.ItemIndicator>
              <Icon :glyph="check" />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>
  </Combobox.Root>
</template>
