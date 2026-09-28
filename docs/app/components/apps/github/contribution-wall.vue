<script setup lang="ts">
import { cell, defineChart } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleOrdinal } from "@tanstack/charts/scales/ordinal";

import { type ContributionDay } from "./contributions";

const props = defineProps<{ days: ContributionDay[] }>();

// The ink ladder replaces GitHub's green: the darker the wash of the
// accent, the heavier that day's hand — one pigment, five densities.
const inkTiers = [
  "var(--bs-color-surface-inset)",
  "color-mix(in oklab, var(--bs-color-primary) 25%, var(--bs-color-surface-1))",
  "color-mix(in oklab, var(--bs-color-primary) 50%, var(--bs-color-surface-1))",
  "color-mix(in oklab, var(--bs-color-primary) 75%, var(--bs-color-surface-1))",
  "var(--bs-color-primary)",
];
const tierScale = scaleOrdinal<string, string>()
  .domain(inkTiers.map((_, i) => String(i)))
  .range(inkTiers);

const definition = defineChart({
  marks: [cell(props.days, { x: "week", y: "weekday", color: (d) => String(d.tier), inset: 2 })],
  scales: {
    x: {
      scale: () =>
        scaleBand<number>()
          .domain(props.days.map((d) => d.week))
          .padding(0.08),
      axis: false,
    },
    y: {
      scale: () => scaleBand<number>().domain([0, 1, 2, 3, 4, 5, 6]).padding(0.2),
      axis: false,
    },
  },
  color: { scale: tierScale },
}) as ChartDefinition;

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const tip = (d: ContributionDay) =>
  `${fmt.format(d.date)} — ${d.commits} ${d.commits === 1 ? "commit" : "commits"}`;
</script>

<template>
  <figure class="m-0">
    <Chart :height="150" :definition="definition" aria-label="Contributions over the past year">
      <template #tooltipBody="{ points }">{{ tip(points[0]!.datum) }}</template>
    </Chart>
    <figcaption class="mt-3 flex items-center justify-end gap-2 text-xs text-tertiary">
      <span>Less</span>
      <span class="flex gap-1">
        <span
          v-for="t in inkTiers"
          :key="t"
          class="size-3 rounded-[2px]"
          :style="{ background: t }"
        />
      </span>
      <span>More</span>
    </figcaption>
  </figure>
</template>
