<script setup lang="ts">
import { Ellipsis } from "@bysages/vue";

const prose =
  "The vessel holds the page the way a column holds ink: fully, and only up to its brim. " +
  "Whatever runs past the measure gives way, and the cut is drawn so quietly that the reader " +
  "finishes the sentence from memory instead of the margin.";
</script>

<template>
  <div class="grid grid-cols-2 gap-4 w-full">
    <Ellipsis :lines="2">{{ prose }}</Ellipsis>
    <Ellipsis :lines="4">{{ prose }}</Ellipsis>
  </div>
</template>
