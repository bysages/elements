<script setup lang="ts">
import { Stack } from "@bysages/vue";
</script>

<template>
  <!-- Siblings held apart by one named step — the default `md`. -->
  <Stack class="w-full">
    <div class="border border-border bg-surface-3 px-3 py-2 text-sm">First</div>
    <div class="border border-border bg-surface-3 px-3 py-2 text-sm">Second</div>
    <div class="border border-border bg-surface-3 px-3 py-2 text-sm">Third</div>
  </Stack>
</template>
