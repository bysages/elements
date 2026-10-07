<script setup lang="ts">
import { Card } from "@bysages/vue";
import { computed } from "vue";

import type { OrderRow } from "./data";
import OrdersTable from "./orders-table.vue";

const { locale } = useI18n();

const copy = {
  en: {
    title: "Accounts",
    description: "Sort any column, search across customers, and edit or archive from the row.",
  },
  zh: {
    title: "客户账户",
    description: "各列均可排序，支持搜索客户，并可在行内编辑或归档。",
  },
} as const;

const text = computed(() => copy[locale.value as keyof typeof copy]);

defineProps<{ rows: OrderRow[] }>();

defineEmits<{
  detail: [row: OrderRow];
  edit: [row: OrderRow];
  archive: [selected: OrderRow[]];
}>();
</script>

<template>
  <Card>
    <Card.Header>
      <Card.Title>{{ text.title }}</Card.Title>
      <Card.Description>{{ text.description }}</Card.Description>
    </Card.Header>
    <Card.Content>
      <OrdersTable
        :rows="rows"
        @detail="$emit('detail', $event)"
        @edit="$emit('edit', $event)"
        @archive="$emit('archive', $event)"
      />
    </Card.Content>
  </Card>
</template>
