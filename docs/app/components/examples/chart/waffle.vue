<script setup lang="ts">
import { defineChart, waffleY } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";

const weeks = [
  { day: "Mon", visits: 120 },
  { day: "Tue", visits: 148 },
  { day: "Wed", visits: 131 },
  { day: "Thu", visits: 165 },
  { day: "Fri", visits: 189 },
  { day: "Sat", visits: 96 },
  { day: "Sun", visits: 74 },
];

const definition = defineChart({
  // The waffle's mark type outruns the definition overload here; the
  // cast keeps the example honest about the runtime contract.
  marks: [waffleY(weeks, { y: "visits", columns: 20, gap: 2 }) as any],
  scales: {
    x: { scale: () => scaleBand<string>().padding(0.1) },
    y: { scale: scaleLinear, grid: false },
  },
}) as ChartDefinition;
</script>

<template>
  <div style="max-inline-size: 34rem">
    <Chart :definition="definition" aria-label="Visits per day, waffle of squares" />
  </div>
</template>
