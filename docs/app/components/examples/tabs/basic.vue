<script setup lang="ts">
import { Tabs } from "@bysages/vue";

const items = [
  {
    value: "ink",
    label: "Ink",
    content: "Content is ink — the marks that carry the words.",
  },
  {
    value: "paper",
    label: "Paper",
    content: "The ground is warm paper, never pure white.",
  },
  {
    value: "light",
    label: "Light",
    content: "Hierarchy is light — shadow answers to the source.",
  },
];
</script>

<template>
  <Tabs :items="items" default-value="ink" class="w-full" />
</template>
