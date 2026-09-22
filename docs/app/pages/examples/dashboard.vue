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

definePageMeta({ layout: "default", examples: true });

useSeoMeta({
  title: "Admin Dashboard example",
  description:
    "A complete revenue console — stat cards, charts, and a data table with filtering, selection, and editing — built from Elements components.",
});

const sourceUrl =
  "https://github.com/bysages/elements/tree/main/docs/app/components/apps/dashboard";

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
  <div class="example-page">
    <header class="example-head">
      <p class="example-kicker">Example</p>
      <h1 class="example-title">Admin Dashboard</h1>
      <p class="example-lede">
        A revenue console assembled from the library: stat cards, charts, and a data table whose
        sorting, searching, selection, and editing all run live. No server — the ledger is local
        state.
      </p>
      <a :href="sourceUrl" target="_blank" rel="noopener" class="example-source">View source</a>
    </header>

    <Shell>
      <div class="dash-stack">
        <StatRow />
        <div class="dash-charts">
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

    <OrderDetailDrawer :open="detailOpen" :row="detailRow" @close="detailOpen = false" />
    <OrderEditDialog
      :open="editOpen"
      :row="editingRow"
      @close="editOpen = false"
      @save="saveEdit"
    />
    <Toaster :toaster="toaster" v-slot="toast">
      <Toast.Root>
        <Toast.Title>{{ toast.title }}</Toast.Title>
        <Toast.Description>{{ toast.description }}</Toast.Description>
        <Toast.CloseTrigger aria-label="Close">×</Toast.CloseTrigger>
      </Toast.Root>
    </Toaster>
  </div>
</template>

<style scoped>
.example-page {
  inline-size: 100%;
  max-inline-size: 90rem;
  margin-inline: auto;
  padding: var(--bs-space-8) var(--bs-space-6) var(--bs-space-12);
}

.example-head {
  max-inline-size: 44rem;
  margin-block-end: var(--bs-space-7);
}

.example-kicker {
  margin: 0 0 var(--bs-space-2);
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
  text-transform: uppercase;
}

.example-title {
  font-family: var(--bs-font-serif);
  font-size: var(--bs-font-size-4xl);
  line-height: var(--bs-line-height-tight);
  margin: 0 0 var(--bs-space-3);
}

.example-lede {
  color: var(--bs-color-text-secondary);
  margin: 0 0 var(--bs-space-3);
}

.example-source {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  text-decoration: none;
}

.example-source:hover {
  color: var(--bs-color-text-secondary);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.dash-stack {
  display: grid;
  gap: var(--bs-space-5);
}

.dash-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: var(--bs-space-5);
}
</style>
