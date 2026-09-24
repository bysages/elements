<script setup lang="ts">
import { Badge, Button, Drawer } from "@bysages/vue";

import { type OrderRow, type OrderStatus } from "./data";

const props = defineProps<{ open: boolean; row: OrderRow | null }>();

const emit = defineEmits<{ close: [] }>();

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
        <Drawer.Content class="detail">
          <Drawer.Grabber><Drawer.GrabberIndicator /></Drawer.Grabber>
          <Drawer.Title>{{ row?.customer ?? "Account" }}</Drawer.Title>
          <Drawer.Description>Account detail — everything the ledger knows.</Drawer.Description>

          <dl v-if="row" class="detail-grid">
            <dt>Status</dt>
            <dd>
              <Badge :tone="statusTone[row.status]" variant="subtle">{{ row.status }}</Badge>
            </dd>
            <dt>Region</dt>
            <dd>{{ row.region }}</dd>
            <dt>Monthly recurring</dt>
            <dd>{{ row.mrr ? `$${row.mrr.toLocaleString("en-US")}` : "—" }}</dd>
            <dt>Customer since</dt>
            <dd>{{ row.since }}</dd>
          </dl>

          <Drawer.CloseTrigger asChild>
            <Button variant="outline" size="sm">Close</Button>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Teleport>
  </Drawer.Root>
</template>

<style scoped>
.detail {
  display: grid;
  gap: var(--bs-space-5);
}

.detail-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--bs-space-2) var(--bs-space-6);
  margin: 0;
}

.detail-grid dt {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
}

.detail-grid dd {
  display: flex;
  margin: 0;
}
</style>
