<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue/select";
import { Button, Dialog, Form, FormField, Input, Select, useForm } from "@bysages/vue";
import { watch } from "vue";
import { z } from "zod";

import { type OrderRow, type OrderStatus } from "./data";

const props = defineProps<{ open: boolean; row: OrderRow | null }>();

const emit = defineEmits<{
  close: [];
  save: [patch: Pick<OrderRow, "customer" | "status" | "mrr">];
}>();

const form = useForm({
  defaultValues: {
    customer: "",
    mrr: 0,
    status: "active" as OrderStatus,
  },
  validators: {
    onChange: z.object({
      customer: z.string().min(1, "The customer name is required."),
      mrr: z.number().min(0, "Cannot be negative."),
      status: z.string(),
    }),
  },
  // The engine only calls this once the schema passes, so this handler
  // is the save itself — no silent early returns anymore.
  onSubmit: ({ value }) => {
    emit("save", {
      customer: value.customer.trim(),
      status: value.status as OrderStatus,
      mrr: value.mrr,
    });
    emit("close");
  },
});

// The dialog edits a working copy — reopening on another row re-seeds it.
watch(
  () => [props.open, props.row] as const,
  ([open]) => {
    if (open && props.row) {
      form.setFieldValue("customer", props.row.customer);
      form.setFieldValue("mrr", props.row.mrr);
      form.setFieldValue("status", props.row.status);
    }
  },
);

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
        <Dialog.Content>
          <Dialog.Title>Edit account</Dialog.Title>
          <Dialog.Description>Changes apply to the ledger immediately.</Dialog.Description>

          <Form :form="form">
            <FormField name="customer" label="Customer" required>
              <template #default="{ field }">
                <Input
                  :model-value="field.state.value"
                  placeholder="Customer name"
                  @update:model-value="field.handleChange"
                  @blur="field.handleBlur"
                />
              </template>
            </FormField>

            <FormField name="mrr" label="Monthly recurring (USD)">
              <template #default="{ field }">
                <Input
                  :model-value="field.state.value ? String(field.state.value) : ''"
                  type="number"
                  min="0"
                  placeholder="0"
                  @update:model-value="(value: string) => field.handleChange(Number(value) || 0)"
                  @blur="field.handleBlur"
                />
              </template>
            </FormField>

            <FormField name="status" label="Status">
              <template #default="{ field }">
                <Select.Root
                  :collection="statusCollection"
                  :model-value="[field.state.value]"
                  @update:model-value="
                    (values: string[]) => field.handleChange(values[0] as OrderStatus)
                  "
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
              </template>
            </FormField>

            <div class="flex justify-end gap-3">
              <Button variant="ghost" @click="emit('close')">Cancel</Button>
              <Button type="submit">Save account</Button>
            </div>
          </Form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
