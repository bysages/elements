<script setup lang="ts">
import { Card, Toast, Toaster } from "@bysages/vue";
import { ref } from "vue";

import AccountsPanel from "../../components/apps/dashboard/accounts-panel.vue";
import BillingPanel from "../../components/apps/dashboard/billing-panel.vue";
import { orders, type OrderRow } from "../../components/apps/dashboard/data";
import OrderDetailDrawer from "../../components/apps/dashboard/order-detail-drawer.vue";
import OrderEditDialog from "../../components/apps/dashboard/order-edit-dialog.vue";
import ReportsPanel from "../../components/apps/dashboard/reports-panel.vue";
import RevenueChart from "../../components/apps/dashboard/revenue-chart.vue";
import SettingsPanel from "../../components/apps/dashboard/settings-panel.vue";
import Shell from "../../components/apps/dashboard/shell.vue";
import StatRow from "../../components/apps/dashboard/stat-row.vue";
import { toaster } from "../../components/apps/dashboard/toast";
import TrendChart from "../../components/apps/dashboard/trend-chart.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

const { locale } = useI18n();

const copy = {
  en: {
    seo: {
      title: "Admin Dashboard example",
      description:
        "A complete revenue console — stat cards, charts, and a data table with filtering, selection, and editing — built from Elements components.",
    },
    header: {
      kicker: "Example",
      title: "Admin Dashboard",
      lede: "A revenue console assembled from the library: stat cards, charts, and a data table whose sorting, searching, selection, and editing all run live. No server — the ledger is local state.",
    },
    newest: {
      title: "Newest accounts",
      description: "The five latest signups; the full ledger lives under Accounts.",
    },
    toasts: {
      saved: {
        title: "Account updated",
        description: (name: string) => `${name} now reads from the new entry.`,
      },
      archived: {
        title: "Archived",
        description: (n: number) => `${n} ${n === 1 ? "account" : "accounts"} left the table.`,
      },
    },
    since: "since",
  },
  zh: {
    seo: {
      title: "管理控制台示例",
      description:
        "一间完整的营收控制台——统计卡、图表，以及一张带筛选、多选、行内编辑的数据表——全部由 Elements 组件构成。",
    },
    header: {
      kicker: "示例",
      title: "管理控制台",
      lede: "用组件库拼出的一间营收控制台：统计卡、图表，以及一张排序、搜索、多选、行内编辑全部实时可用的数据表。没有服务器——账本就是本地状态。",
    },
    newest: {
      title: "最新账户",
      description: "最近注册的五位；完整账本见「客户账户」。",
    },
    toasts: {
      saved: {
        title: "账户已更新",
        description: (name: string) => `${name} 已读入新条目。`,
      },
      archived: {
        title: "已归档",
        description: (n: number) => `${n} 个账户离开了表格。`,
      },
    },
    since: "自",
  },
} as const;

const text = computed(() => copy[locale.value as "en" | "zh"]);

useSeoMeta({
  title: () => text.value.seo.title,
  description: () => text.value.seo.description,
});

const config = useAppConfig() as {
  github?: { url?: string; branch?: string; rootDir?: string };
};

const sourceUrl = [
  config.github?.url,
  "tree",
  config.github?.branch,
  config.github?.rootDir,
  "app/components/apps/dashboard",
]
  .filter(Boolean)
  .join("/");

// The ledger is the page's state: edits and archives land here and the
// table re-renders from the narrowed prop.
const rows = ref<OrderRow[]>([...orders]);

// Every stop in the sider leads to a real pane.
const stop = ref("Overview");

const recentAccounts = [...orders]
  .filter((row) => row.status !== "churned")
  .sort((a, b) => b.since.localeCompare(a.since))
  .slice(0, 5);

const detailRow = ref<OrderRow | null>(null);
const detailOpen = ref(false);
const editingRow = ref<OrderRow | null>(null);
const editOpen = ref(false);

function openDetail(row: OrderRow) {
  detailRow.value = row;
  detailOpen.value = true;
}

function openEdit(row: OrderRow) {
  editingRow.value = row;
  editOpen.value = true;
}

function saveEdit(patch: Pick<OrderRow, "customer" | "status" | "mrr">) {
  if (!editingRow.value) return;
  const id = editingRow.value.id;
  rows.value = rows.value.map((row) => (row.id === id ? { ...row, ...patch } : row));
  const saved = text.value.toasts.saved;
  toaster.create({
    title: saved.title,
    description: saved.description(patch.customer),
    type: "success",
  });
}

function archiveSelected(selected: OrderRow[]) {
  if (!selected.length) return;
  const ids = new Set(selected.map((row) => row.id));
  rows.value = rows.value.filter((row) => !ids.has(row.id));
  const archived = text.value.toasts.archived;
  toaster.create({
    title: archived.title,
    description: archived.description(selected.length),
    type: "info",
  });
}
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      :kicker="text.header.kicker"
      :title="text.header.title"
      :lede="text.header.lede"
      :source-url="sourceUrl"
      class="mb-7"
    />

    <ExampleCanvas>
      <Shell v-model="stop">
        <div v-if="stop === 'Overview'" class="grid gap-5">
          <StatRow />
          <div class="grid grid-cols-[repeat(auto-fit,minmax(min(22rem,100%),1fr))] gap-5">
            <RevenueChart />
            <TrendChart />
          </div>
          <Card.Root>
            <Card.Header>
              <Card.Title>{{ text.newest.title }}</Card.Title>
              <Card.Description>{{ text.newest.description }}</Card.Description>
            </Card.Header>
            <Card.Content>
              <ul class="m-0 grid list-none gap-3 p-0">
                <li
                  v-for="row in recentAccounts"
                  :key="row.id"
                  class="flex items-baseline justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0"
                >
                  <span class="text-sm font-medium">{{ row.customer }}</span>
                  <span class="text-sm text-tertiary">
                    {{ row.region }} · {{ text.since }} {{ row.since }}
                  </span>
                </li>
              </ul>
            </Card.Content>
          </Card.Root>
        </div>

        <AccountsPanel
          v-else-if="stop === 'Accounts'"
          :rows="rows"
          @detail="openDetail"
          @edit="openEdit"
          @archive="archiveSelected"
        />

        <BillingPanel v-else-if="stop === 'Billing'" />

        <ReportsPanel v-else-if="stop === 'Reports'" />

        <SettingsPanel v-else />
      </Shell>
    </ExampleCanvas>

    <ClientOnly>
      <OrderDetailDrawer :open="detailOpen" :row="detailRow" @close="detailOpen = false" />
      <OrderEditDialog
        :open="editOpen"
        :row="editingRow"
        @close="editOpen = false"
        @save="saveEdit"
      />
    </ClientOnly>
    <Toaster :toaster="toaster" v-slot="toast">
      <Toast.Root>
        <Toast.Title>{{ toast.title }}</Toast.Title>
        <Toast.Description>{{ toast.description }}</Toast.Description>
        <Toast.CloseTrigger aria-label="Close">×</Toast.CloseTrigger>
      </Toast.Root>
    </Toaster>
  </div>
</template>
