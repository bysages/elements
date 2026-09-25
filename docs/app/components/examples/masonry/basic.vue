<script setup lang="ts">
import { Masonry } from "@bysages/vue";

// Uneven heights are the point — the wall reads column-first.
const heights = [5, 9, 4, 7, 11, 6, 9, 5, 8, 12, 6, 8, 4, 7];
</script>

<template>
  <Masonry class="w-full">
    <div
      v-for="(height, index) in heights"
      :key="index"
      class="grid place-items-center border border-border bg-surface-3 text-sm text-secondary"
      :style="{ blockSize: `${height}rem` }"
    >
      {{ index + 1 }}
    </div>
  </Masonry>
</template>
