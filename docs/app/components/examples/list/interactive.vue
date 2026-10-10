<script setup lang="ts">
import { List, Stack } from "@bysages/vue";
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
  <Stack gap="md" class="w-full">
    <List.Root bordered hoverable class="w-full">
      <List.Item v-for="row in ledger" :key="row.title" class="p-0">
        <button
          type="button"
          class="flex w-full cursor-pointer items-center gap-(--bs-gap-sm) border-0 bg-transparent p-(--bs-padding-sm) text-start font-[inherit] text-inherit transition-colors duration-(--bs-duration-fast) ease-(--bs-ease-out) hover:bg-[color-mix(in_oklab,var(--bs-color-text-primary)_5%,transparent)] active:bg-(--bs-color-surface-inset) focus-visible:outline-none focus-visible:[box-shadow:var(--bs-focus-ring-inset)]"
          @click="open(row.title)"
        >
          <List.Content>
            <template #title>{{ row.title }}</template>
            <template #description>{{ row.description }}</template>
          </List.Content>
        </button>
      </List.Item>
    </List.Root>
    <p role="status" class="text-sm text-tertiary">
      {{ opened ? `Opened “${opened}”.` : "Nothing opened yet." }}
    </p>
  </Stack>
</template>
