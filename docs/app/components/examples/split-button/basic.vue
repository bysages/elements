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
    <p role="status" class="mt-4 text-sm text-tertiary">
      {{ status }}
    </p>
  </div>
</template>
