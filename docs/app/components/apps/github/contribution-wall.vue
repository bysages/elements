<script setup lang="ts">
import { cell, defineChart } from "@bysages/charts";
import { scaleBand } from "@bysages/charts/scales/band";
import { scaleOrdinal } from "@bysages/charts/scales/ordinal";
import { tooltip } from "@bysages/charts/tooltip";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { computed, onMounted, onUnmounted, ref } from "vue";

const { locale } = useI18n();
const lang = computed(() => locale.value as "en" | "zh");

const copy = {
  en: {
    wall: "Contributions over the past year",
    less: "Less",
    more: "More",
    commits: (n: number) => `${n} ${n === 1 ? "commit" : "commits"}`,
  },
  zh: {
    wall: "过去一年的贡献",
    less: "少",
    more: "多",
    commits: (n: number) => `${n} 次提交`,
  },
} as const;
const text = computed(() => copy[lang.value]);

import { type ContributionDay } from "./contributions";

const props = defineProps<{ days: ContributionDay[] }>();

// The wall lays out on its own 624x84 stage — every cell squares on the
// fixed step — then the stage scales as one piece to fill the card, the
// way the reference profile scales its chart with the viewport.
const WALL_W = 624;
const WALL_H = 84;
const wall = ref<HTMLElement>();
const scale = ref(1);
let wallObserver: ResizeObserver | undefined;
onMounted(() => {
  wallObserver = new ResizeObserver(() => {
    scale.value = (wall.value?.clientWidth ?? WALL_W) / WALL_W;
  });
  if (wall.value) wallObserver.observe(wall.value);
});
onUnmounted(() => wallObserver?.disconnect());

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
  marks: [
    cell(props.days, {
      x: "week",
      y: "weekday",
      color: (d) => String(d.tier),
      inset: 1,
    }),
  ],
  scales: {
    x: {
      scale: () =>
        scaleBand<number>()
          .domain(props.days.map((d) => d.week))
          .padding(0),
      axis: false,
    },
    y: {
      scale: () => scaleBand<number>().domain([0, 1, 2, 3, 4, 5, 6]).padding(0),
      axis: false,
    },
  },
  color: { scale: tierScale },
  tooltip: { use: tooltip },
}) as ChartDefinition;

const fmt = computed(
  () =>
    new Intl.DateTimeFormat(lang.value === "zh" ? "zh-CN" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }),
);
const tip = (d: ContributionDay) =>
  `${fmt.value.format(d.date)} — ${text.value.commits(d.commits)}`;
</script>

<template>
  <figure class="m-0">
    <div ref="wall" class="overflow-hidden" :style="{ height: WALL_H * scale + 'px' }">
      <div
        class="origin-top-left"
        :style="{
          width: WALL_W + 'px',
          height: WALL_H + 'px',
          transform: `scale(${scale})`,
        }"
      >
        <Chart
          :style="{ width: WALL_W + 'px', height: WALL_H + 'px' }"
          :definition="definition"
          :aria-label="text.wall"
        >
          <template #tooltipBody="{ points }">{{ tip(points[0]!.datum) }}</template>
        </Chart>
      </div>
    </div>
    <figcaption class="mt-3 flex items-center justify-end gap-2 text-xs text-tertiary">
      <span>{{ text.less }}</span>
      <span class="flex gap-1">
        <span
          v-for="t in inkTiers"
          :key="t"
          class="size-3 rounded-[2px]"
          :style="{ background: t }"
        />
      </span>
      <span>{{ text.more }}</span>
    </figcaption>
  </figure>
</template>
