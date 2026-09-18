<script setup lang="ts">
import { Stack } from "@bysages/vue";

const steps = ["none", "xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-4); inline-size: 100%">
    <Stack v-for="step in steps" :key="step" :gap="step">
      <div class="tile">{{ step }}</div>
      <div class="tile">…</div>
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
