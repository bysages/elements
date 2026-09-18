<script setup lang="ts">
import { boxY, chartColors, defineChart } from "@bysages/charts";
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

const samples = weeks.flatMap((d) =>
  [0.7, 0.9, 1, 1.1, 1.35].map((f) => ({ day: d.day, visits: Math.round(d.visits * f) })),
);

const definition = defineChart({
  marks: [boxY(samples, { x: "day", y: "visits", fill: chartColors.ink })],
  scales: {
    x: { scale: () => scaleBand<string>().padding(0.35) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Visits" } },
  },
}) as ChartDefinition;
</script>

<template>
  <div style="max-inline-size: 34rem">
    <Chart :definition="definition" aria-label="Visits per day, boxes" />
  </div>
</template>
