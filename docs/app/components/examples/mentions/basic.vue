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
  <div class="w-full">
    <Mentions
      v-model="text"
      :items="teammates"
      placeholder="Describe the task and @who should read it…"
    />
    <p role="status" class="mt-4 text-sm text-tertiary">
      {{ text ? `Field holds: ${text}` : "The field is empty." }}
    </p>
  </div>
</template>
