<script setup lang="ts">
import { Splitter } from "@bysages/vue";

const items = [
  { id: "draft", label: "Draft" },
  { id: "notes", label: "Notes" },
];
</script>

<template>
  <Splitter :items="items" :default-value="[40, 60]" class="h-40" />
</template>
