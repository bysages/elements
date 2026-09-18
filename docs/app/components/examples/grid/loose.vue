<script setup lang="ts">
import { Grid } from "@bysages/vue";
</script>

<template>
  <Grid :columns="3" gap="xl" style="inline-size: 100%">
    <div v-for="n in 3" :key="n" class="tile">{{ n }}</div>
  </Grid>
</template>

<style scoped>
.tile {
  display: grid;
  place-items: center;
  padding: var(--bs-space-3);
  background: var(--bs-color-surface-3);
  border: 1px solid var(--bs-color-border);
  font-size: var(--bs-font-size-sm);
  color: var(--bs-color-text-secondary);
}
</style>
