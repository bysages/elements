<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { check, chevrons_up_down, x } from "@bysages/icons";
import { Icon, Select } from "@bysages/vue";

const collection = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});
</script>

<template>
  <Select.Root :collection="collection">
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select" />
      </Select.Trigger>
      <Select.ClearTrigger>
        <Icon :glyph="x" />
      </Select.ClearTrigger>
      <Select.Indicator>
        <Icon :glyph="chevrons_up_down" />
      </Select.Indicator>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
            <Select.Item v-for="item in collection.items" :key="item.value" :item="item">
              <Select.ItemText>{{ item.label }}</Select.ItemText>
              <Select.ItemIndicator>
                <Icon :glyph="check" />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
    <Select.HiddenSelect />
  </Select.Root>
</template>
