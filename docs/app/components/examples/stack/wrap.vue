<script setup lang="ts">
import { Stack } from "@bysages/vue";
</script>

<template>
  <!-- A row that has run out of room lays its overflow down a line. -->
  <div style="inline-size: 24rem">
    <Stack direction="row" wrap>
      <div v-for="n in 8" :key="n" class="tile">Item {{ n }}</div>
    </Stack>
  </div>
</template>

<style scoped>
.tile {
  padding: var(--bs-space-2) var(--bs-space-3);
  background: var(--bs-color-surface-3);
  border: 1px solid var(--bs-color-border);
  font-size: var(--bs-font-size-sm);
}
</style>
