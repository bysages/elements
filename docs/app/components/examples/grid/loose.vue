<script setup lang="ts">
import { Grid } from "@bysages/vue";
</script>

<template>
  <Grid :columns="3" gap="xl" class="w-full">
    <div
      v-for="n in 3"
      :key="n"
      class="grid place-items-center border border-border bg-surface-3 p-3 text-sm text-secondary"
    >
      {{ n }}
    </div>
  </Grid>
</template>
