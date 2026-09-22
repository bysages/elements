<script setup lang="ts">
import { areaY, chartColors, defineChart, ruleY } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { Card } from "@bysages/vue";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";

import { weeklyTrend } from "./data";

const mean = Math.round(
  weeklyTrend.reduce((sum, entry) => sum + entry.sessions, 0) / weeklyTrend.length,
);

const definition = defineChart({
  marks: [
    areaY(weeklyTrend, {
      x: "day",
      y: "sessions",
      fill: chartColors.ink,
      fillOpacity: 0.12,
      strokeWidth: 2,
    }),
    ruleY([mean], { stroke: chartColors.danger, strokeDasharray: "4 3" }),
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.3) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Sessions" } },
  },
}) as ChartDefinition;
</script>

<template>
  <Card.Root class="chart-card">
    <Card.Header>
      <Card.Title>Sessions this week</Card.Title>
      <Card.Description>Daily console visits with the weekly mean.</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart
        :definition="definition"
        aria-label="Console sessions per day, area chart with a mean rule"
      />
    </Card.Content>
  </Card.Root>
</template>
