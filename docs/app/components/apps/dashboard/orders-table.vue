<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { Badge, Button, createColumnHelper, DataTable, Select, type ColumnDef } from "@bysages/vue";
import { computed, h, ref } from "vue";

import { type OrderRow, type OrderStatus } from "./data";

const props = defineProps<{ rows: OrderRow[] }>();

const emit = defineEmits<{
  detail: [row: OrderRow];
  edit: [row: OrderRow];
  archive: [rows: OrderRow[]];
}>();

const helper = createColumnHelper<OrderRow>();

const statusTone: Record<OrderStatus, string> = {
  active: "success",
  trial: "info",
  paused: "warning",
  churned: "danger",
};

const actionIcon = {
  width: 15,
  height: 15,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 1.75,
  "aria-hidden": true,
};

/** Every column opts out of the built-in header filters — the toolbar's
 * global search and the status select above the table are the only
 * filters this panel shows. */
const columns: ColumnDef<OrderRow, any, any>[] = [
  helper.accessor("customer", { id: "customer", header: "Customer", enableColumnFilter: false }),
  helper.accessor("region", { id: "region", header: "Region", enableColumnFilter: false }),
  helper.accessor("status", {
    id: "status",
    header: "Status",
    enableColumnFilter: false,
    cell: (info) =>
      h(Badge, { tone: statusTone[info.getValue()], variant: "subtle" }, () => info.getValue()),
  }),
  helper.accessor("mrr", {
    id: "mrr",
    header: "MRR",
    enableColumnFilter: false,
    meta: { numeric: true },
    cell: (info) => (info.getValue() ? `$${info.getValue().toLocaleString("en-US")}` : "—"),
  }),
  helper.accessor("since", {
    id: "since",
    header: "Since",
    enableColumnFilter: false,
    meta: { numeric: true },
  }),
  helper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => [
      h(
        Button,
        {
          variant: "ghost",
          size: "sm",
          square: true,
          "aria-label": `View ${row.original.customer}`,
          onClick: () => emit("detail", row.original),
        },
        () => [
          h("svg", actionIcon, () => [
            h("path", { d: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" }),
            h("circle", { cx: 12, cy: 12, r: 2.5 }),
          ]),
        ],
      ),
      h(
        Button,
        {
          variant: "ghost",
          size: "sm",
          square: true,
          "aria-label": `Edit ${row.original.customer}`,
          onClick: () => emit("edit", row.original),
        },
        () => [h("svg", actionIcon, () => [h("path", { d: "M14.5 4.5l5 5L8 21H3v-5L14.5 4.5Z" })])],
      ),
    ],
  }),
];

const statusCollection = createListCollection({
  items: [
    { label: "All statuses", value: "all" },
    { label: "Active", value: "active" },
    { label: "Trial", value: "trial" },
    { label: "Paused", value: "paused" },
    { label: "Churned", value: "churned" },
  ],
});

const statusFilter = ref<string | null>("all");

/** The status select pre-filters the data array — sorting, pagination
 * and the global search then run on the narrowed set inside DataTable. */
const filteredRows = computed(() =>
  statusFilter.value && statusFilter.value !== "all"
    ? props.rows.filter((order) => order.status === statusFilter.value)
    : props.rows,
);

// DataTable exposes its TanStack instance; reading the selection through
// it keeps the count reactive (the Vue-aware atoms re-render this).
const tableRef = ref<{
  table: {
    getSelectedRowModel: () => { rows: { original: OrderRow }[] };
    toggleAllRowsSelected: (value: boolean) => void;
  };
} | null>(null);

const selectedRows = computed(
  () => tableRef.value?.table.getSelectedRowModel().rows.map((row) => row.original) ?? [],
);

function archiveSelected() {
  emit("archive", selectedRows.value);
  tableRef.value?.table.toggleAllRowsSelected(false);
}
</script>

<template>
  <div class="orders">
    <div class="orders-toolbar">
      <Select.Root
        :collection="statusCollection"
        :model-value="statusFilter ? [statusFilter] : []"
        @update:model-value="(values: string[]) => (statusFilter = values[0] ?? null)"
      >
        <Select.Control>
          <Select.Trigger class="orders-status">
            <Select.ValueText placeholder="All statuses" />
          </Select.Trigger>
        </Select.Control>
        <Teleport to="body">
          <Select.Positioner>
            <Select.Content>
              <Select.Item v-for="item in statusCollection.items" :key="item.value" :item="item">
                <Select.ItemText>{{ item.label }}</Select.ItemText>
                <Select.ItemIndicator>✓</Select.ItemIndicator>
              </Select.Item>
            </Select.Content>
          </Select.Positioner>
        </Teleport>
        <Select.HiddenSelect />
      </Select.Root>

      <p v-if="selectedRows.length" class="orders-selection">
        {{ selectedRows.length }} selected
        <Button variant="outline" size="sm" @click="archiveSelected">Archive selected</Button>
      </p>
    </div>

    <DataTable
      ref="tableRef"
      :data="filteredRows"
      :columns="columns"
      selectable
      paginated
      :page-size="8"
      :page-size-options="[8, 16, 32]"
      filterable
      global-filter-placeholder="Search customers…"
      empty-text="No accounts match."
      :initial-sorting="[{ id: 'since', desc: true }]"
    />
  </div>
</template>

<style scoped>
.orders {
  display: grid;
  gap: var(--bs-space-4);
}

.orders-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--bs-space-4);
}

.orders-status {
  inline-size: 11rem;
}

.orders-selection {
  display: flex;
  align-items: center;
  gap: var(--bs-space-3);
  margin: 0;
  color: var(--bs-color-text-secondary);
  font-size: var(--bs-font-size-sm);
}
</style>
