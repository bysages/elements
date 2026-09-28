<script setup lang="ts">
import { cell, defineChart } from "@bysages/charts";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleOrdinal } from "@tanstack/charts/scales/ordinal";

const slots = ["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Fixed sample load per cell — the demo is deterministic, so the wall
// reads the same on the server and the client.
const load = [
  [1, 2, 3, 2, 2, 1, 0, 0],
  [2, 3, 4, 3, 2, 1, 0, 0],
  [2, 4, 4, 3, 3, 2, 1, 0],
  [1, 3, 4, 4, 2, 2, 1, 0],
  [2, 3, 3, 4, 3, 2, 1, 1],
  [0, 1, 2, 2, 3, 3, 2, 1],
  [0, 0, 1, 2, 2, 2, 1, 0],
];

const rows = days.flatMap((day, d) => slots.map((slot, s) => ({ day, slot, tier: load[d][s] })));

// The ramp is the ink's own density: the busier the bench, the deeper
// the wash of the primary pigment — no second hue enters the drawing.
const inkTiers = [
  "var(--bs-color-surface-inset)",
  "color-mix(in oklab, var(--bs-color-primary) 25%, var(--bs-color-surface-1))",
  "color-mix(in oklab, var(--bs-color-primary) 50%, var(--bs-color-surface-1))",
  "color-mix(in oklab, var(--bs-color-primary) 75%, var(--bs-color-surface-1))",
  "var(--bs-color-primary)",
];
const tierScale = scaleOrdinal<string, string>().domain(["0", "1", "2", "3", "4"]).range(inkTiers);

const definition = defineChart({
  marks: [cell(rows, { x: "slot", y: "day", color: (d) => String(d.tier), inset: 2 })],
  scales: {
    x: { scale: () => scaleBand<string>().domain(slots).padding(0.05) },
    y: { scale: () => scaleBand<string>().domain(days).padding(0.15), axis: {} },
  },
  color: { scale: tierScale },
}) as ChartDefinition;
</script>

<template>
  <figure class="m-0 max-w-136">
    <Chart :definition="definition" aria-label="Bench occupancy by day and time slot" />
    <figcaption class="mt-3 flex items-center gap-2 text-xs text-tertiary">
      <span>Quiet</span>
      <span class="flex gap-1">
        <span
          v-for="t in inkTiers"
          :key="t"
          class="size-3 rounded-[2px]"
          :style="{ background: t }"
        />
      </span>
      <span>Full</span>
    </figcaption>
  </figure>
</template>
