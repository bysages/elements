<script setup lang="ts">
import { Masonry } from "@bysages/vue";

// Uneven heights are the point — the wall reads column-first.
const heights = [5, 9, 4, 7, 11, 6, 9, 5, 8, 12, 6, 8, 4, 7];
</script>

<template>
  <Masonry style="inline-size: 100%">
    <div
      v-for="(height, index) in heights"
      :key="index"
      class="stone"
      :style="{ blockSize: `${height}rem` }"
    >
      {{ index + 1 }}
    </div>
  </Masonry>
</template>

<style scoped>
.stone {
  display: grid;
  place-items: center;
  background: var(--bs-color-surface-3);
  border: 1px solid var(--bs-color-border);
  font-size: var(--bs-font-size-sm);
  color: var(--bs-color-text-secondary);
}
</style>
