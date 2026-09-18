<script setup lang="ts">
import { ProgressGroup, type ProgressSegment } from "@bysages/vue";

const segments: ProgressSegment[] = [
  { value: 60, pigment: "success" },
  { value: 30, pigment: "warning" },
  { value: 10, pigment: "danger" },
];
</script>

<template>
  <div style="display: grid; gap: 0.75rem; inline-size: 100%">
    <ProgressGroup :segments="segments" :show-legend="false" />
    <span style="font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary)">
      Six in ten entries pass the first reading.
    </span>
  </div>
</template>
