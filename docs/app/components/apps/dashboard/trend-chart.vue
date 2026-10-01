<script setup lang="ts">
import { areaY, chartColors, chartMuted, defineChart, ruleY } from "@bysages/charts";
import { scaleLinear } from "@bysages/charts/scales/linear";
import { scalePoint } from "@bysages/charts/scales/point";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { Card } from "@bysages/vue";
import { computed } from "vue";

import { weeklyTrend, type Locale } from "./data";

const { locale } = useI18n();

const copy = {
  en: {
    title: "Sessions this week",
    description: "Daily console visits with the weekly mean.",
    axis: "Sessions",
    aria: "Console sessions per day, area chart with a mean rule",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    title: "本周访问量",
    description: "每日控制台访问量，附周均值线。",
    axis: "访问量",
    aria: "按日展示控制台访问量的面积图，含周均值参考线",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
} as const;

const text = computed(() => copy[locale.value as Locale]);
const localizedTrend = computed(() =>
  weeklyTrend.map((entry, index) => ({
    ...entry,
    day: text.value.days[index],
  })),
);

const mean = Math.round(
  weeklyTrend.reduce((sum, entry) => sum + entry.sessions, 0) / weeklyTrend.length,
);

const definition = computed(
  () =>
    defineChart({
      marks: [
        areaY(localizedTrend.value, {
          x: "day",
          y: "sessions",
          fill: chartColors.ink,
          fillOpacity: 0.12,
          strokeWidth: 2,
        }),
        ruleY([mean], { stroke: chartMuted, strokeDasharray: "4 3" }),
      ],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.3) },
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
