<script setup lang="ts">
import { chartColors, defineChart, dot, lineY } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";

const months = [
  { month: "Jan", orders: 42 },
  { month: "Feb", orders: 58 },
  { month: "Mar", orders: 51 },
  { month: "Apr", orders: 73 },
  { month: "May", orders: 86 },
];

const definition = defineChart({
  marks: [
    lineY(months, { x: "month", y: "orders", stroke: chartColors.ink, strokeWidth: 2 }),
    dot(months, { x: "month", y: "orders", fill: chartColors.ink, r: 3 }),
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.3) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Orders" } },
  },
}) as ChartDefinition;
</script>

<template>
  <div class="max-w-136">
    <Chart :definition="definition" aria-label="Monthly orders, line" />
  </div>
</template>
