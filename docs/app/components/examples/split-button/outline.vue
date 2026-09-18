<script setup lang="ts">
import { SplitButton } from "@bysages/vue";
import { ref } from "vue";

const status = ref("Nothing chosen yet.");
const items = [
  { label: "Export as PDF", value: "pdf" },
  { label: "Export as CSV", value: "csv" },
  { label: "Export as JSON", value: "json" },
];
</script>

<template>
  <div>
    <SplitButton
      label="Export"
      variant="outline"
      size="sm"
      :items="items"
      @click="status = 'Exported.'"
      @select="(value: string) => (status = `Chose ${value}`)"
    />
    <p
      role="status"
      style="
        margin-block-start: var(--bs-space-4);
        font-size: var(--bs-font-size-sm);
        color: var(--bs-color-text-tertiary);
      "
    >
      {{ status }}
    </p>
  </div>
</template>
