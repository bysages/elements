<script setup lang="ts">
import { areaY, chartColors, defineChart, lineY } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { Stat } from "@bysages/vue";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";

const trend = [
  { m: "Jan", orders: 42 },
  { m: "Feb", orders: 38 },
  { m: "Mar", orders: 51 },
  { m: "Apr", orders: 47 },
  { m: "May", orders: 66 },
  { m: "Jun", orders: 61 },
  { m: "Jul", orders: 78 },
  { m: "Aug", orders: 86 },
];

// A sparkline is a trend reduced to its shape — no axes, no grid, the
// ink line and a breath of the same pigment under it. Numbers live in
// the stat beside it, not on the drawing.
const definition = defineChart({
  marks: [
    areaY(trend, { x: "m", y: "orders", fill: chartColors.ink, fillOpacity: 0.12 }),
    lineY(trend, { x: "m", y: "orders", stroke: chartColors.ink, strokeWidth: 1.5 }),
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.2), axis: false },
    y: { scale: scaleLinear, nice: true, axis: false, grid: false },
  },
}) as ChartDefinition;
</script>

<template>
  <Stat.Root class="max-w-80!">
    <Stat.Label>Orders this season</Stat.Label>
    <div class="flex items-end justify-between gap-4">
      <Stat.Value>8,214</Stat.Value>
      <div class="h-12 w-36 [&_.ts-chart]:block!">
        <Chart :definition="definition" aria-label="Orders trend, sparkline" />
      </div>
    </div>
    <Stat.Description direction="up">+12% vs last season</Stat.Description>
  </Stat.Root>
</template>
