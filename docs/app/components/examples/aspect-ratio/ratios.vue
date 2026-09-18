<script setup lang="ts">
import { AspectRatio } from "@bysages/vue";

const ratios = ["1 / 1", "4 / 3", "16 / 9"];
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--bs-space-4);
      inline-size: 100%;
    "
  >
    <AspectRatio v-for="ratio in ratios" :key="ratio" :ratio="ratio">
      <div class="pane">{{ ratio }}</div>
    </AspectRatio>
  </div>
</template>

<style scoped>
.pane {
  display: grid;
  place-items: center;
  background: var(--bs-color-surface-3);
  border: 1px solid var(--bs-color-border);
  font-size: var(--bs-font-size-sm);
  color: var(--bs-color-text-secondary);
}
</style>
