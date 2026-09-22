<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { Button, Dialog, Input, Select } from "@bysages/vue";
import { reactive, watch } from "vue";

import { type OrderRow, type OrderStatus } from "./data";

const props = defineProps<{ open: boolean; row: OrderRow | null }>();

const emit = defineEmits<{
  close: [];
  save: [patch: Pick<OrderRow, "customer" | "status" | "mrr">];
}>();

const form = reactive({
  customer: "",
  mrr: 0,
  status: "active" as OrderStatus,
});

// The dialog edits a working copy — reopening on another row re-seeds it.
watch(
  () => [props.open, props.row] as const,
  ([open]) => {
    if (open && props.row) {
      form.customer = props.row.customer;
      form.mrr = props.row.mrr;
      form.status = props.row.status;
    }
  },
);

function save() {
  if (!form.customer.trim()) return;
  emit("save", { customer: form.customer.trim(), status: form.status, mrr: form.mrr });
  emit("close");
}

const statusCollection = createListCollection({
  items: [
    { label: "Active", value: "active" },
    { label: "Trial", value: "trial" },
    { label: "Paused", value: "paused" },
    { label: "Churned", value: "churned" },
  ],
});
</script>

<template>
  <Dialog.Root :open="props.open" @update:open="(value: boolean) => !value && emit('close')">
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content class="editor">
          <Dialog.Title>Edit account</Dialog.Title>
          <Dialog.Description>Changes apply to the ledger immediately.</Dialog.Description>

          <label class="editor-field">
            <span>Customer</span>
            <Input v-model="form.customer" placeholder="Customer name" />
          </label>

          <label class="editor-field">
            <span>Monthly recurring (USD)</span>
            <Input
              :model-value="form.mrr ? String(form.mrr) : ''"
              type="number"
              min="0"
              placeholder="0"
              @update:model-value="(value: string) => (form.mrr = Number(value) || 0)"
            />
          </label>

          <div class="editor-field">
            <span>Status</span>
            <Select.Root
              :collection="statusCollection"
              :model-value="[form.status]"
              @update:model-value="(values: string[]) => (form.status = values[0] as OrderStatus)"
            >
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Status" />
                </Select.Trigger>
              </Select.Control>
              <Teleport to="body">
                <Select.Positioner>
                  <Select.Content>
                    <Select.Item
                      v-for="item in statusCollection.items"
                      :key="item.value"
                      :item="item"
                    >
                      <Select.ItemText>{{ item.label }}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>
                  </Select.Content>
                </Select.Positioner>
              </Teleport>
              <Select.HiddenSelect />
            </Select.Root>
          </div>

          <div class="editor-actions">
            <Dialog.CloseTrigger>
              <Button variant="ghost">Cancel</Button>
            </Dialog.CloseTrigger>
            <Button @click="save">Save changes</Button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>

<style scoped>
.editor {
  display: grid;
  gap: var(--bs-space-5);
}

.editor-field {
  display: grid;
  gap: var(--bs-space-2);
}

.editor-field > span {
  color: var(--bs-color-text-tertiary);
  font-size: var(--bs-font-size-sm);
  letter-spacing: var(--bs-tracking-label);
}

.editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--bs-space-3);
}
</style>
