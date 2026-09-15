<script setup lang="ts">
import { DataTable } from "@bysages/vue";

const columns = [
  { accessorKey: "region", header: "Region" },
  { accessorKey: "units", header: "Units", meta: { numeric: true } },
  { accessorKey: "revenue", header: "Revenue", meta: { numeric: true } },
];

const data = [
  { region: "Jiangnan", units: 1240, revenue: "$18,400" },
  { region: "Hokuriku", units: 860, revenue: "$12,150" },
  { region: "Lingnan", units: 620, revenue: "$9,320" },
];
</script>

<template>
  <DataTable :data="data" :columns="columns" />
</template>
