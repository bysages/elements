<script setup lang="ts">
import { barY, chartColors, defineChart } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { Card } from "@bysages/vue";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";

import { monthlyRevenue } from "./data";

const definition = defineChart({
  marks: [
    barY(monthlyRevenue, {
      x: "month",
      y: "revenue",
      fill: chartColors.ink,
      fillOpacity: 0.82,
      insetTop: 2,
    }),
  ],
  scales: {
    x: { scale: scaleBand, padding: 0.24 },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Revenue (k$)" } },
  },
}) as ChartDefinition;
</script>

<template>
  <Card.Root class="chart-card">
    <Card.Header>
      <Card.Title>Revenue by month</Card.Title>
      <Card.Description>The last four quarters, in thousands.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart :definition="definition" aria-label="Monthly recurring revenue by month, bar chart" />
    </Card.Content>
  </Card.Root>
</template>
