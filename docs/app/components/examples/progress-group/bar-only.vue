<script setup lang="ts">
import { ProgressGroup, type ProgressSegment } from "@bysages/vue";

const segments: ProgressSegment[] = [
  { value: 60, pigment: "success" },
  { value: 30, pigment: "warning" },
  { value: 10, pigment: "danger" },
];
</script>

<template>
  <div class="grid gap-3 w-full">
    <ProgressGroup :segments="segments" :show-legend="false" />
    <span class="text-sm text-tertiary"> Six in ten entries pass the first reading. </span>
  </div>
</template>
