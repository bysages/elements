<script setup lang="ts">
import { barY, chartColors, defineChart } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";

const months = [
  { month: "Jan", orders: 42 },
  { month: "Feb", orders: 58 },
  { month: "Mar", orders: 51 },
  { month: "Apr", orders: 73 },
  { month: "May", orders: 86 },
];

const definition = defineChart({
  marks: [barY(months, { x: "month", y: "orders", fill: chartColors.ink })],
  scales: {
    x: { scale: () => scaleBand<string>().padding(0.25) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Orders" } },
  },
}) as ChartDefinition;
</script>

<template>
  <div style="max-inline-size: 34rem">
    <Chart :definition="definition" aria-label="Monthly orders, bars" />
  </div>
</template>
