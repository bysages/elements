<script setup lang="ts">
import { areaY, chartColors, defineChart } from "@bysages/charts";
import { scaleBand } from "@bysages/charts/scales/band";
import { scaleLinear } from "@bysages/charts/scales/linear";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { Button, Card, Progress } from "@bysages/vue";
import { computed } from "vue";

import { cashCollected, channels, type Locale } from "./data";
import { toaster } from "./toast";

const { locale } = useI18n();

const copy = {
  en: {
    cash: {
      title: "Cash collected",
      description: "The same twelve months, as money in the door.",
      axis: "Cash (k$)",
      aria: "Cash collected by month, area chart",
      months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    },
    sources: {
      title: "Where accounts come from",
      description: "Share of the active book by channel.",
      channels: {
        direct: { label: "Direct & referral", accounts: "{count} accounts" },
        marketplace: { label: "Marketplace", accounts: "{count} accounts" },
        outbound: { label: "Outbound", accounts: "{count} accounts" },
        events: { label: "Events", accounts: "{count} accounts" },
      },
    },
    pack: {
      title: "Quarterly pack",
      description: "Everything on this page, laid out for the board deck - assembled on demand.",
      export: "Export Q3 pack",
      exportTitle: "Report exported",
      exportBody: "Q3 pack rendered with the figures on this page.",
      schedule: "Schedule quarterly",
      scheduleTitle: "Scheduled",
      scheduleBody: "The pack will render on the first of each quarter.",
    },
  },
  zh: {
    cash: {
      title: "实收现金",
      description: "同一年的资金到账情况。",
      axis: "现金（千元）",
      aria: "按月展示实收现金的面积图",
      months: [
        "10月",
        "11月",
        "12月",
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
      ],
    },
    sources: {
      title: "客户来源分布",
      description: "按获客渠道展示活跃客户占比。",
      channels: {
        direct: { label: "直销与推荐", accounts: "{count} 个客户" },
        marketplace: { label: "应用市场", accounts: "{count} 个客户" },
        outbound: { label: "主动触达", accounts: "{count} 个客户" },
        events: { label: "线下活动", accounts: "{count} 个客户" },
      },
    },
    pack: {
      title: "季度报告包",
      description: "汇总本页全部数据，按董事会演示版式按需生成。",
      export: "导出 Q3 报告包",
      exportTitle: "报表已导出",
      exportBody: "Q3 报告包已按本页数据生成。",
      schedule: "设置季度生成",
      scheduleTitle: "已设置定时生成",
      scheduleBody: "报告包将在每季度首月自动生成。",
    },
  },
} as const;

const text = computed(() => copy[locale.value as Locale]);
const localizedCash = computed(() =>
  cashCollected.map((entry, index) => ({
    ...entry,
    month: text.value.cash.months[index],
  })),
);
const localizedChannels = computed(() =>
  channels.map((channel) => ({
    ...channel,
    label: text.value.sources.channels[channel.id].label,
    accountsText: text.value.sources.channels[channel.id].accounts.replace(
      "{count}",
      String(channel.accounts),
    ),
  })),
);

const definition = computed(
  () =>
    defineChart({
      marks: [
        areaY(localizedCash.value, {
          x: "month",
          y: "cash",
          fill: chartColors.ink,
          fillOpacity: 0.14,
          strokeWidth: 2,
        }),
      ],
      scales: {
        x: { scale: scaleBand, padding: 0.24 },
        y: {
          scale: scaleLinear,
          nice: true,
          grid: true,
          axis: { label: text.value.cash.axis },
        },
      },
    }) as ChartDefinition,
);
</script>

<template>
  <div class="grid content-start gap-(--bs-gap-lg)">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(22rem,100%),1fr))] gap-(--bs-gap-lg)">
      <Card.Root>
        <Card.Header>
          <Card.Title>{{ text.cash.title }}</Card.Title>
          <Card.Description>{{ text.cash.description }}</Card.Description>
        </Card.Header>
        <Card.Content>
          <Chart :definition="definition" :aria-label="text.cash.aria" />
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>{{ text.sources.title }}</Card.Title>
          <Card.Description>{{ text.sources.description }}</Card.Description>
        </Card.Header>
        <Card.Content class="grid content-start gap-(--bs-gap-lg)">
          <Progress.Root v-for="row in localizedChannels" :key="row.id" :model-value="row.share">
            <Progress.Label>{{ row.label }} · {{ row.accountsText }}</Progress.Label>
            <Progress.ValueText />
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <Card.Root>
      <Card.Header>
        <Card.Title>{{ text.pack.title }}</Card.Title>
        <Card.Description>{{ text.pack.description }}</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button
          @click="
            toaster.create({
              title: text.pack.exportTitle,
              description: text.pack.exportBody,
              type: 'success',
            })
          "
        >
          {{ text.pack.export }}
        </Button>
        <Button
          variant="ghost"
          @click="
            toaster.create({
              title: text.pack.scheduleTitle,
              description: text.pack.scheduleBody,
              type: 'info',
            })
          "
        >
          {{ text.pack.schedule }}
        </Button>
      </Card.Footer>
    </Card.Root>
  </div>
</template>
