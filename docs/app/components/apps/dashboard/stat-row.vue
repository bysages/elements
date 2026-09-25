<script setup lang="ts">
import { Stat } from "@bysages/vue";

import { statFigures } from "./data";
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
    <Stat.Root v-for="figure in statFigures" :key="figure.label">
      <Stat.Label>{{ figure.label }}</Stat.Label>
      <Stat.Value>{{ figure.value }}</Stat.Value>
      <Stat.Delta :direction="figure.direction">{{ figure.delta }}</Stat.Delta>
      <Stat.Description>{{ figure.description }}</Stat.Description>
    </Stat.Root>
  </div>
</template>
