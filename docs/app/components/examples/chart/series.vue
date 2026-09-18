<script setup lang="ts">
import { chartSeriesRange, defineChart, lineY } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scaleOrdinal } from "@tanstack/charts/scales/ordinal";
import { scalePoint } from "@tanstack/charts/scales/point";

const rows = [
  { month: "Jan", region: "North", orders: 42 },
  { month: "Feb", region: "North", orders: 58 },
  { month: "Mar", region: "North", orders: 51 },
  { month: "Jan", region: "South", orders: 30 },
  { month: "Feb", region: "South", orders: 47 },
  { month: "Mar", region: "South", orders: 64 },
  { month: "Jan", region: "West", orders: 25 },
  { month: "Feb", region: "West", orders: 38 },
  { month: "Mar", region: "West", orders: 45 },
];

const color = scaleOrdinal<string, string>()
  .domain(["North", "South", "West"])
  .range(chartSeriesRange.slice(0, 3));

const definition = defineChart({
  marks: [lineY(rows, { x: "month", y: "orders", z: "region", strokeWidth: 2 })],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.3) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Orders" } },
  },
  color: { scale: color },
}) as ChartDefinition;
</script>

<template>
  <div style="max-inline-size: 34rem">
    <Chart :definition="definition" aria-label="Monthly orders by region, lines" />
  </div>
</template>
