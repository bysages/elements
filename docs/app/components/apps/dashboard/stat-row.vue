<script setup lang="ts">
import { Stat } from "@bysages/vue";

import { statFigures } from "./data";
</script>

<template>
  <div class="stat-row">
    <Stat.Root v-for="figure in statFigures" :key="figure.label">
      <Stat.Label>{{ figure.label }}</Stat.Label>
      <Stat.Value>{{ figure.value }}</Stat.Value>
      <Stat.Delta :direction="figure.direction">{{ figure.delta }}</Stat.Delta>
      <Stat.Description>{{ figure.description }}</Stat.Description>
    </Stat.Root>
  </div>
</template>

<style scoped>
.stat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: var(--bs-space-4);
}
</style>
