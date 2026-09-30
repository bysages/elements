<script setup lang="ts">
import { VirtualList } from "@bysages/vue";

const rows = Array.from({ length: 10000 }, (_, index) => `Row ${index + 1}`);
</script>

<template>
  <VirtualList :items="rows" :item-height="36" :height="216" class="w-full">
    <template #item="{ item, index }">
      <div
        class="flex h-full items-center border-b border-border px-4 text-sm"
        :class="index % 2 ? 'text-secondary' : ''"
      >
        {{ item }}
      </div>
    </template>
  </VirtualList>
</template>
