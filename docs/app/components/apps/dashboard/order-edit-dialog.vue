<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { Button, Dialog, Form, FormField, Input, Select } from "@bysages/vue";
import { reactive, watch } from "vue";
import { z } from "zod";

import { type OrderRow, type OrderStatus } from "./data";

const props = defineProps<{ open: boolean; row: OrderRow | null }>();

const emit = defineEmits<{
  close: [];
  save: [patch: Pick<OrderRow, "customer" | "status" | "mrr">];
}>();

const schema = z.object({
  customer: z.string().min(1, "The customer name is required."),
  mrr: z.number().min(0, "Cannot be negative."),
  status: z.string(),
});

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

// The Form only emits submit once the schema passes, so this handler is
// the save itself — no silent early returns anymore.
function submit() {
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

          <Form :state="form" :schema="schema" @submit="submit">
            <FormField name="customer" label="Customer" required>
              <Input v-model="form.customer" placeholder="Customer name" />
            </FormField>

            <FormField name="mrr" label="Monthly recurring (USD)">
              <Input
                :model-value="form.mrr ? String(form.mrr) : ''"
                type="number"
                min="0"
                placeholder="0"
                @update:model-value="(value: string) => (form.mrr = Number(value) || 0)"
              />
            </FormField>

            <FormField name="status" label="Status">
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
            </FormField>

            <div class="editor-actions">
              <Button variant="ghost" @click="emit('close')">Cancel</Button>
              <Button type="submit">Save account</Button>
            </div>
          </Form>
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

.editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--bs-space-3);
}
</style>
