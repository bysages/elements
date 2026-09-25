<script setup lang="ts">
import { Card, Toast, Toaster } from "@bysages/vue";
import { ref } from "vue";

import { orders, type OrderRow } from "../../components/apps/dashboard/data";
import OrderDetailDrawer from "../../components/apps/dashboard/order-detail-drawer.vue";
import OrderEditDialog from "../../components/apps/dashboard/order-edit-dialog.vue";
import OrdersTable from "../../components/apps/dashboard/orders-table.vue";
import RevenueChart from "../../components/apps/dashboard/revenue-chart.vue";
import Shell from "../../components/apps/dashboard/shell.vue";
import StatRow from "../../components/apps/dashboard/stat-row.vue";
import { toaster } from "../../components/apps/dashboard/toast";
import TrendChart from "../../components/apps/dashboard/trend-chart.vue";
import ExampleCanvas from "../../components/example-canvas.vue";
import ExampleHeader from "../../components/example-header.vue";

definePageMeta({ layout: "default", examples: true });

useSeoMeta({
  title: "Admin Dashboard example",
  description:
    "A complete revenue console — stat cards, charts, and a data table with filtering, selection, and editing — built from Elements components.",
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
  toaster.create({
    title: "Account updated",
    description: `${patch.customer} now reads from the new entry.`,
    type: "success",
  });
}

function archiveSelected(selected: OrderRow[]) {
  if (!selected.length) return;
  const ids = new Set(selected.map((row) => row.id));
  rows.value = rows.value.filter((row) => !ids.has(row.id));
  toaster.create({
    title: "Archived",
    description: `${selected.length} ${selected.length === 1 ? "account" : "accounts"} left the table.`,
    type: "info",
  });
}
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-6 pb-12 pt-8">
    <ExampleHeader
      kicker="Example"
      title="Admin Dashboard"
      lede="A revenue console assembled from the library: stat cards, charts, and a data table whose sorting, searching, selection, and editing all run live. No server — the ledger is local state."
      :source-url="sourceUrl"
      class="mb-7"
    />

    <ExampleCanvas>
      <Shell>
        <div class="grid gap-5">
          <StatRow />
          <div class="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-5">
            <RevenueChart />
            <TrendChart />
          </div>
          <Card.Root>
            <Card.Header>
              <Card.Title>Accounts</Card.Title>
              <Card.Description>
                Sort any column, search across customers, and edit or archive from the row.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <OrdersTable
                :rows="rows"
                @detail="openDetail"
                @edit="openEdit"
                @archive="archiveSelected"
              />
            </Card.Content>
          </Card.Root>
        </div>
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
