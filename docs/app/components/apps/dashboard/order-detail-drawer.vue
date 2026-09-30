<script setup lang="ts">
import { Badge, Button, Drawer } from "@bysages/vue";
import { computed } from "vue";

import {
  formatCurrency,
  formatRegion,
  formatYearMonth,
  type Locale,
  type OrderRow,
  type OrderStatus,
} from "./data";

const { locale } = useI18n();

const props = defineProps<{ open: boolean; row: OrderRow | null }>();

const emit = defineEmits<{ close: [] }>();

const copy = {
  en: {
    fallback: "Account",
    description: "Account detail — everything the ledger knows.",
    fields: {
      status: "Status",
      region: "Region",
      mrr: "Monthly recurring",
      since: "Customer since",
    },
    statuses: {
      active: "Active",
      trial: "Trial",
      paused: "Paused",
      churned: "Churned",
    },
    close: "Close",
  },
  zh: {
    fallback: "客户账户",
    description: "账户详情——账簿中记录的全部信息。",
    fields: {
      status: "状态",
      region: "地区",
      mrr: "月度经常性收入",
      since: "签约时间",
    },
    statuses: {
      active: "使用中",
      trial: "试用中",
      paused: "已暂停",
      churned: "已流失",
    },
    close: "关闭",
  },
} as const;

const text = computed(() => copy[locale.value as Locale]);

const statusTone: Record<OrderStatus, string> = {
  active: "success",
  trial: "info",
  paused: "warning",
  churned: "danger",
};
</script>

<template>
  <Drawer.Root :open="props.open" @update:open="(value: boolean) => !value && emit('close')">
    <Teleport to="body">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Grabber><Drawer.GrabberIndicator /></Drawer.Grabber>
          <Drawer.Title>{{ row?.customer ?? text.fallback }}</Drawer.Title>
          <Drawer.Description>{{ text.description }}</Drawer.Description>

          <dl v-if="row" class="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            <dt class="text-sm text-tertiary">{{ text.fields.status }}</dt>
            <dd class="m-0 flex">
              <Badge :tone="statusTone[row.status]" variant="subtle">
                {{ text.statuses[row.status] }}
              </Badge>
            </dd>
            <dt class="text-sm text-tertiary">{{ text.fields.region }}</dt>
            <dd class="m-0 flex">
              {{ formatRegion(row.region, locale as Locale) }}
            </dd>
            <dt class="text-sm text-tertiary">{{ text.fields.mrr }}</dt>
            <dd class="m-0 flex">
              {{ row.mrr ? formatCurrency(row.mrr, locale as Locale) : "—" }}
            </dd>
            <dt class="text-sm text-tertiary">{{ text.fields.since }}</dt>
            <dd class="m-0 flex">
              {{ formatYearMonth(row.since, locale as Locale) }}
            </dd>
          </dl>

          <Button variant="outline" size="sm" @click="emit('close')">{{ text.close }}</Button>
        </Drawer.Content>
      </Drawer.Positioner>
    </Teleport>
  </Drawer.Root>
</template>
