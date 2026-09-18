<script setup lang="ts">
import { Stack } from "@bysages/vue";
</script>

<template>
  <Stack direction="row" style="inline-size: 100%">
    <div class="tile">First</div>
    <div class="tile">Second</div>
    <div class="tile">Third</div>
  </Stack>
</template>

<style scoped>
.tile {
  padding: var(--bs-space-2) var(--bs-space-3);
  background: var(--bs-color-surface-3);
  border: 1px solid var(--bs-color-border);
  font-size: var(--bs-font-size-sm);
}
</style>
