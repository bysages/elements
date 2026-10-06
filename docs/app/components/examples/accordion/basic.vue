<script setup lang="ts">
import { Accordion } from "@bysages/vue";

const items = [
  {
    value: "paper",
    title: "What is the paper-and-ink system?",
    content:
      "Interfaces are warm paper, content is ink, hierarchy is light — never pure white, never a hard pop.",
  },
  {
    value: "tokens",
    title: "Where do visual values come from?",
    content:
      "Every color, spacing, radius, elevation, and duration resolves from design tokens; a hardcoded pixel is a bug.",
  },
];
</script>

<template>
  <Accordion :items="items" :default-value="['paper']" />
</template>
