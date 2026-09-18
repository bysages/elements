<script setup lang="ts">
import { Masonry } from "@bysages/vue";

const heights = [5, 9, 4, 7, 11, 6, 9, 5, 8, 12, 6, 8, 4, 7];
const layouts = [2, 4];
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-6); inline-size: 100%">
    <Masonry v-for="columns in layouts" :key="columns" :columns="columns">
      <div
        v-for="(height, index) in heights"
        :key="index"
        class="stone"
        :style="{ blockSize: `${height}rem` }"
      >
        {{ index + 1 }}
      </div>
    </Masonry>
  </div>
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
