<script setup lang="ts">
import { Stat } from "@bysages/vue";
import { computed } from "vue";

import { statFigures } from "./data";

const { locale } = useI18n();

const copy = {
  en: [
    {
      label: "Monthly recurring",
      value: "$18,240",
      delta: "↑ 4.2%",
      description: "Against last month",
    },
    {
      label: "Active accounts",
      value: "42",
      delta: "↑ 3",
      description: "Two trials converted",
    },
    {
      label: "Churn rate",
      value: "2.1%",
      delta: "↓ 0.4%",
      description: "Lowest in a year",
    },
    {
      label: "Avg. contract",
      value: "$1,860",
      delta: "— 0.0%",
      description: "Holding steady",
    },
  ],
  zh: [
    {
      label: "月度经常性收入",
      value: "¥18,240",
      delta: "↑ 4.2%",
      description: "较上月",
    },
    {
      label: "活跃账户",
      value: "42",
      delta: "↑ 3",
      description: "2 个试用已转正",
    },
    {
      label: "流失率",
      value: "2.1%",
      delta: "↓ 0.4%",
      description: "近一年最低",
    },
    {
      label: "平均合同额",
      value: "¥1,860",
      delta: "— 0.0%",
      description: "保持稳定",
    },
  ],
} as const;

const figures = computed(() =>
  copy[locale.value as keyof typeof copy].map((figure, index) => ({
    ...figure,
    direction: statFigures[index].direction,
  })),
);
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(min(13rem,100%),1fr))] gap-(--bs-gap-lg)">
    <Stat v-for="figure in figures" :key="figure.label">
      <Stat.Label>{{ figure.label }}</Stat.Label>
      <Stat.Value>{{ figure.value }}</Stat.Value>
      <Stat.Delta :direction="figure.direction">{{ figure.delta }}</Stat.Delta>
      <Stat.Description>{{ figure.description }}</Stat.Description>
    </Stat>
  </div>
</template>
