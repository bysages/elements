<script setup lang="ts">
import { areaY, chartColors, defineChart, ruleY } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";

const weeks = [
  { day: "Mon", visits: 120 },
  { day: "Tue", visits: 148 },
  { day: "Wed", visits: 131 },
  { day: "Thu", visits: 165 },
  { day: "Fri", visits: 189 },
  { day: "Sat", visits: 96 },
  { day: "Sun", visits: 74 },
];

const mean = Math.round(weeks.reduce((sum, d) => sum + d.visits, 0) / weeks.length);

const definition = defineChart({
  marks: [
    areaY(weeks, {
      x: "day",
      y: "visits",
      fill: chartColors.ink,
      fillOpacity: 0.12,
      strokeWidth: 2,
    }),
    ruleY([mean], { stroke: chartColors.danger, strokeDasharray: "4 3" }),
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.3) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Visits" } },
  },
}) as ChartDefinition;
</script>

<template>
  <div style="max-inline-size: 34rem">
    <Chart :definition="definition" aria-label="Visits per day, area with a mean rule" />
  </div>
</template>
