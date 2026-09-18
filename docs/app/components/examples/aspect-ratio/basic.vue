<script setup lang="ts">
import { AspectRatio } from "@bysages/vue";
</script>

<template>
  <AspectRatio ratio="16 / 9" style="inline-size: 100%">
    <div class="pane">16 / 9</div>
  </AspectRatio>
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
