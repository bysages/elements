<script setup lang="ts">
import { SegmentGroup } from "@bysages/vue";

const periods = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];
</script>

<template>
  <SegmentGroup :items="periods" default-value="week" />
</template>
