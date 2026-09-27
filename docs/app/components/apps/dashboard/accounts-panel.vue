<script setup lang="ts">
import { Card } from "@bysages/vue";

import type { OrderRow } from "./data";
import OrdersTable from "./orders-table.vue";

defineProps<{ rows: OrderRow[] }>();

defineEmits<{
  detail: [row: OrderRow];
  edit: [row: OrderRow];
  archive: [selected: OrderRow[]];
}>();
</script>

<template>
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
        @detail="$emit('detail', $event)"
        @edit="$emit('edit', $event)"
        @archive="$emit('archive', $event)"
      />
    </Card.Content>
  </Card.Root>
</template>
