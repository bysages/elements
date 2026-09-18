<script setup lang="ts">
import { Mentions } from "@bysages/vue";
import { ref } from "vue";

const text = ref("");

const teammates = [
  { label: "Lin Hua", value: "lin" },
  { label: "Mei Chen", value: "mei" },
  { label: "Hong Wei", value: "hong" },
  { label: "Yan Wu", value: "yan" },
  { label: "Zhou Lan", value: "zhou" },
];
</script>

<template>
  <div style="inline-size: 100%">
    <Mentions
      v-model="text"
      :items="teammates"
      placeholder="Describe the task and @who should read it…"
    />
    <p
      role="status"
      style="
        margin-block-start: var(--bs-space-4);
        font-size: var(--bs-font-size-sm);
        color: var(--bs-color-text-tertiary);
      "
    >
      {{ text ? `Field holds: ${text}` : "The field is empty." }}
    </p>
  </div>
</template>
