<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { Button, createColumnHelper, DataTable, Input, Select, type ColumnDef } from "@bysages/vue";
import { computed, Fragment, h, ref } from "vue";

import { type OrderRow } from "./data";

const props = defineProps<{ rows: OrderRow[] }>();

const emit = defineEmits<{
  detail: [row: OrderRow];
  edit: [row: OrderRow];
  archive: [rows: OrderRow[]];
}>();

const helper = createColumnHelper<OrderRow>();

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
 * status select and global search are the only filters this panel
 * shows, so no column carries a status of its own. */
const columns: ColumnDef<OrderRow, any, any>[] = [
  helper.accessor("customer", { id: "customer", header: "Customer", enableColumnFilter: false }),
  helper.accessor("region", { id: "region", header: "Region", enableColumnFilter: false }),
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
    // vue-table v9's flexRender h()es non-vnode objects — an array of
    // buttons must ride a Fragment, not a bare array.
    cell: ({ row }) =>
      h(Fragment, [
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
              h("path", {
                d: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z",
              }),
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
          () => [
            h("svg", actionIcon, () => [h("path", { d: "M14.5 4.5l5 5L8 21H3v-5L14.5 4.5Z" })]),
          ],
        ),
      ]),
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

// DataTable exposes its TanStack instance; reading through the Vue-aware
// atoms keeps the selection count and the search box reactive.
const tableRef = ref<{
  table: {
    atoms: { globalFilter: { get: () => unknown } };
    setGlobalFilter: (value: string) => void;
    getSelectedRowModel: () => { rows: { original: OrderRow }[] };
    toggleAllRowsSelected: (value: boolean) => void;
  };
} | null>(null);

const search = computed({
  get: () => (tableRef.value?.table.atoms.globalFilter.get() as string) ?? "",
  set: (value: string) => tableRef.value?.table.setGlobalFilter(value),
});

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

      <span class="orders-toolbar-spacer" />

      <Input v-model="search" class="orders-search" placeholder="Search customers…" />
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
      :show-toolbar="false"
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

/* The field baseline makes select roots fill their container — a toolbar
 * slot is a layout decision, so the flex line decides the width here. */
.orders-toolbar :deep([data-scope="select"][data-part="root"]) {
  inline-size: auto;
}

.orders-toolbar-spacer {
  flex: 1;
}

.orders-status {
  inline-size: 11rem;
}

.orders-search {
  inline-size: 15rem;
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
