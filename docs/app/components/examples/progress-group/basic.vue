<script setup lang="ts">
import { ProgressGroup, type ProgressSegment } from "@bysages/vue";

const segments: ProgressSegment[] = [
  { value: 42, label: "Shelved", pigment: "primary" },
  { value: 28, label: "Catalogued", pigment: "info" },
  { value: 18, label: "Awaiting seal", pigment: "warning" },
  { value: 12, label: "Deferred", pigment: "danger" },
];
</script>

<template>
  <ProgressGroup :segments="segments" class="w-full" />
</template>
