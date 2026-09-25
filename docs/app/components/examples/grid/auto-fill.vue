<script setup lang="ts">
import { Grid } from "@bysages/vue";
</script>

<template>
  <!-- With minChildWidth the container counts the tracks itself: grow
       and shrink the canvas and the lattice re-counts. -->
  <Grid min-child-width="10rem" class="w-full">
    <div
      v-for="n in 6"
      :key="n"
      class="grid place-items-center border border-border bg-surface-3 p-3 text-sm text-secondary"
    >
      {{ n }}
    </div>
  </Grid>
</template>
