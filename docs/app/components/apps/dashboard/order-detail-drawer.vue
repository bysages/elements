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
        <Drawer.Content>
          <Drawer.Grabber><Drawer.GrabberIndicator /></Drawer.Grabber>
          <Drawer.Title>{{ row?.customer ?? "Account" }}</Drawer.Title>
          <Drawer.Description>Account detail — everything the ledger knows.</Drawer.Description>

          <dl v-if="row" class="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            <dt class="text-sm text-tertiary">Status</dt>
            <dd class="m-0 flex">
              <Badge :tone="statusTone[row.status]" variant="subtle">{{ row.status }}</Badge>
            </dd>
            <dt class="text-sm text-tertiary">Region</dt>
            <dd class="m-0 flex">{{ row.region }}</dd>
            <dt class="text-sm text-tertiary">Monthly recurring</dt>
            <dd class="m-0 flex">{{ row.mrr ? `$${row.mrr.toLocaleString("en-US")}` : "—" }}</dd>
            <dt class="text-sm text-tertiary">Customer since</dt>
            <dd class="m-0 flex">{{ row.since }}</dd>
          </dl>

          <Drawer.CloseTrigger asChild>
            <Button variant="outline" size="sm">Close</Button>
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Teleport>
  </Drawer.Root>
</template>
