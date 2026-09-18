<script setup lang="ts">
import { List } from "@bysages/vue";
import { ref } from "vue";

const opened = ref("");

const ledger = [
  { title: "Morning readings", description: "Barometer steady, ink flows well." },
  { title: "Noon deliveries", description: "Two crates of paper from the mill." },
  { title: "Evening closings", description: "The lamps are trimmed at dusk." },
];

const open = (title: string) => {
  opened.value = title;
};
</script>

<template>
  <div style="inline-size: 100%">
    <List.Root bordered hoverable style="inline-size: 100%">
      <List.Item
        v-for="row in ledger"
        :key="row.title"
        role="button"
        tabindex="0"
        @click="open(row.title)"
        @keydown.enter.prevent="open(row.title)"
        @keydown.space.prevent="open(row.title)"
      >
        <List.Content>
          <template #title>{{ row.title }}</template>
          <template #description>{{ row.description }}</template>
        </List.Content>
      </List.Item>
    </List.Root>
    <p
      role="status"
      style="
        margin-block-start: var(--bs-space-4);
        font-size: var(--bs-font-size-sm);
        color: var(--bs-color-text-tertiary);
      "
    >
      {{ opened ? `Opened “${opened}”.` : "Nothing opened yet." }}
    </p>
  </div>
</template>
