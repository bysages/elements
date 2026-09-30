<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { Button, createColumnHelper, DataTable, Input, Select, type ColumnDef } from "@bysages/vue";
import { computed, Fragment, h, ref } from "vue";

import { formatCurrency, formatRegion, formatYearMonth, type Locale, type OrderRow } from "./data";

const { locale } = useI18n();

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

const copy = {
  en: {
    columns: {
      customer: "Customer",
      region: "Region",
      mrr: "MRR",
      since: "Since",
    },
    actions: { view: "View", edit: "Edit" },
    statuses: {
      all: "All statuses",
      active: "Active",
      trial: "Trial",
      paused: "Paused",
      churned: "Churned",
    },
    selected: "{count} selected",
    archive: "Archive selected",
    search: "Search customers…",
    empty: "No accounts match.",
  },
  zh: {
    columns: {
      customer: "客户",
      region: "地区",
      mrr: "月度经常性收入",
      since: "签约时间",
    },
    actions: { view: "查看", edit: "编辑" },
    statuses: {
      all: "全部状态",
      active: "使用中",
      trial: "试用中",
      paused: "已暂停",
      churned: "已流失",
    },
    selected: "已选 {count} 个账户",
    archive: "归档所选",
    search: "搜索客户…",
    empty: "没有匹配的客户账户。",
  },
} as const;

const text = computed(() => copy[locale.value as Locale]);

/** Every column opts out of the built-in header filters — the toolbar's
 * status select and global search are the only filters this panel
 * shows, so no column carries a status of its own. */
const columns = computed<ColumnDef<OrderRow, any, any>[]>(() => [
  helper.accessor("customer", {
    id: "customer",
    header: text.value.columns.customer,
    enableColumnFilter: false,
  }),
  helper.accessor("region", {
    id: "region",
    header: text.value.columns.region,
    enableColumnFilter: false,
    cell: (info) => formatRegion(info.getValue(), locale.value as Locale),
  }),
  helper.accessor("mrr", {
    id: "mrr",
    header: text.value.columns.mrr,
    enableColumnFilter: false,
    meta: { numeric: true },
    cell: (info) =>
      info.getValue() ? formatCurrency(info.getValue(), locale.value as Locale) : "—",
  }),
  helper.accessor("since", {
    id: "since",
    header: text.value.columns.since,
    enableColumnFilter: false,
    meta: { numeric: true },
    cell: (info) => formatYearMonth(info.getValue(), locale.value as Locale),
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
            "aria-label": `${text.value.actions.view} ${row.original.customer}`,
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
            "aria-label": `${text.value.actions.edit} ${row.original.customer}`,
            onClick: () => emit("edit", row.original),
          },
          () => [
            h("svg", actionIcon, () => [h("path", { d: "M14.5 4.5l5 5L8 21H3v-5L14.5 4.5Z" })]),
          ],
        ),
      ]),
  }),
]);

const statusCollection = computed(() =>
  createListCollection({
    items: Object.entries(text.value.statuses).map(([value, label]) => ({
      value,
      label,
    })),
  }),
);

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

const selectedText = computed(() =>
  text.value.selected.replace("{count}", String(selectedRows.value.length)),
);

function archiveSelected() {
  emit("archive", selectedRows.value);
  tableRef.value?.table.toggleAllRowsSelected(false);
}
</script>

<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap items-center gap-4">
      <!-- w-auto! outranks the unlayered field baseline that makes select
           roots fill their container — a toolbar slot is a layout
           decision, and this flex line decides the width. -->
      <Select.Root
        class="w-auto!"
        :collection="statusCollection"
        :model-value="statusFilter ? [statusFilter] : []"
        @update:model-value="(values: string[]) => (statusFilter = values[0] ?? null)"
      >
        <Select.Control>
          <Select.Trigger class="w-44">
            <Select.ValueText :placeholder="text.statuses.all" />
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

      <p v-if="selectedRows.length" class="m-0 flex items-center gap-3 text-sm text-secondary">
        {{ selectedText }}
        <Button variant="outline" size="sm" @click="archiveSelected">{{ text.archive }}</Button>
      </p>

      <span class="flex-1" />

      <Input v-model="search" class="w-60!" :placeholder="text.search" />
    </div>

    <DataTable
      ref="tableRef"
      :data="filteredRows"
      :columns="columns"
      selectable
      paginated
      :page-size="10"
      :page-size-options="[10, 20, 50]"
      filterable
      :show-toolbar="false"
      :empty-text="text.empty"
      :initial-sorting="[{ id: 'since', desc: true }]"
    />
  </div>
</template>
