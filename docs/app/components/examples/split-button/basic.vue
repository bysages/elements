<script setup lang="ts">
import { SplitButton } from "@bysages/vue";
import { ref } from "vue";

const status = ref("Nothing chosen yet.");
const items = [
  { label: "Save as…", value: "save-as" },
  { label: "Export…", value: "export" },
  { label: "Delete draft", value: "delete", danger: true },
];
</script>

<template>
  <div>
    <SplitButton
      label="Save"
      :items="items"
      @click="status = 'Saved.'"
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
