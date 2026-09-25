<script setup lang="ts">
import { Masonry } from "@bysages/vue";

const heights = [5, 9, 4, 7, 11, 6, 9, 5, 8, 12, 6, 8, 4, 7];
const layouts = [2, 4];
</script>

<template>
  <div class="grid w-full gap-6">
    <Masonry v-for="columns in layouts" :key="columns" :columns="columns">
      <div
        v-for="(height, index) in heights"
        :key="index"
        class="grid place-items-center border border-border bg-surface-3 text-sm text-secondary"
        :style="{ blockSize: `${height}rem` }"
      >
        {{ index + 1 }}
      </div>
    </Masonry>
  </div>
</template>
