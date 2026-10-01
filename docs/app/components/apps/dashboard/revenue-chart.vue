<script setup lang="ts">
import { barY, chartColors, defineChart } from "@bysages/charts";
import { scaleBand } from "@bysages/charts/scales/band";
import { scaleLinear } from "@bysages/charts/scales/linear";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { Card } from "@bysages/vue";
import { computed } from "vue";

import { monthlyRevenue, type Locale } from "./data";

const { locale } = useI18n();

const copy = {
  en: {
    title: "Revenue by month",
    description: "The last four quarters, in thousands.",
    axis: "Revenue (k$)",
    aria: "Monthly recurring revenue by month, bar chart",
    months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  zh: {
    title: "月度营收",
    description: "近四个季度，单位为千元。",
    axis: "营收（千元）",
    aria: "按月展示的月度经常性收入柱状图",
    months: ["10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月"],
  },
} as const;

const text = computed(() => copy[locale.value as Locale]);
const localizedRevenue = computed(() =>
  monthlyRevenue.map((entry, index) => ({
    ...entry,
    month: text.value.months[index],
  })),
);

const definition = computed(
  () =>
    defineChart({
      marks: [
        barY(localizedRevenue.value, {
          x: "month",
          y: "revenue",
          fill: chartColors.ink,
          fillOpacity: 0.82,
          insetTop: 2,
        }),
      ],
      scales: {
        x: {
          scale: scaleBand,
          padding: 0.24,
          /* Narrow lanes thin the month labels by collision, keeping the
             first and the last; the tooltip still names every month. */
          axis: { tickLabels: { thin: { minGap: 40, priority: "ends" } } },
        },
        y: {
          scale: scaleLinear,
          nice: true,
          grid: true,
          axis: { label: text.value.axis },
        },
      },
    }) as ChartDefinition,
);
</script>

<template>
  <Card.Root class="chart-card">
    <Card.Header>
      <Card.Title>{{ text.title }}</Card.Title>
      <Card.Description>{{ text.description }}</Card.Description>
    </Card.Header>
    <Card.Content>
      <Chart :definition="definition" :aria-label="text.aria" />
    </Card.Content>
  </Card.Root>
</template>
