<script setup lang="ts">
import { ProgressGroup, type ProgressSegment } from "@bysages/vue";

const segments: ProgressSegment[] = [
  { value: 64, label: "Bound", pigment: "success" },
  { value: 48, label: "In press", pigment: "info" },
];
</script>

<template>
  <!-- A larger whole leaves the remainder as groove. -->
  <ProgressGroup :segments="segments" :max="200" style="inline-size: 100%" />
</template>
