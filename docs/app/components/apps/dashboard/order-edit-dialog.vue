<script setup lang="ts">
import { Button, Dialog, Form, FormField, Input, Select, useForm } from "@bysages/vue";
import { computed, watch } from "vue";
import { z } from "zod";

import { type Locale, type OrderRow, type OrderStatus } from "./data";

const { locale } = useI18n();

const props = defineProps<{ open: boolean; row: OrderRow | null }>();

const emit = defineEmits<{
  close: [];
  save: [patch: Pick<OrderRow, "customer" | "status" | "mrr">];
}>();

const copy = {
  en: {
    title: "Edit account",
    description: "Changes apply to the ledger immediately.",
    customer: "Customer",
    customerPlaceholder: "Customer name",
    mrr: "Monthly recurring (USD)",
    status: "Status",
    statuses: {
      active: "Active",
      trial: "Trial",
      paused: "Paused",
      churned: "Churned",
    },
    errors: {
      customer: "The customer name is required.",
      mrr: "Cannot be negative.",
    },
    cancel: "Cancel",
    save: "Save account",
  },
  zh: {
    title: "编辑客户账户",
    description: "保存后会立即更新到账簿。",
    customer: "客户名称",
    customerPlaceholder: "请输入客户名称",
    mrr: "月度经常性收入（¥）",
    status: "状态",
    statuses: {
      active: "使用中",
      trial: "试用中",
      paused: "已暂停",
      churned: "已流失",
    },
    errors: {
      customer: "请填写客户名称。",
      mrr: "金额不能为负数。",
    },
    cancel: "取消",
    save: "保存账户",
  },
} as const;

const text = computed(() => copy[locale.value as Locale]);

const schema = z.object({
  customer: z.string().min(1),
  mrr: z.number().min(0),
  status: z.string(),
});

const form = useForm({
  defaultValues: {
    customer: "",
    mrr: 0,
    status: "active" as OrderStatus,
  },
  validators: {
    onChange: ({ value }) => {
      const result = schema.safeParse(value);
      if (result.success) return;

      const messages = text.value.errors;
      const fields: Partial<Record<keyof typeof messages, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === "customer" || field === "mrr") fields[field] ??= messages[field];
      }
      return { fields };
    },
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

const statusOptions = computed(() =>
  (Object.keys(text.value.statuses) as OrderStatus[]).map((value) => ({
    value,
    label: text.value.statuses[value],
  })),
);
</script>

<template>
  <Dialog.Root :open="props.open" @update:open="(value: boolean) => !value && emit('close')">
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>{{ text.title }}</Dialog.Title>
          <Dialog.Description>{{ text.description }}</Dialog.Description>

          <Form :form="form">
            <FormField name="customer" :label="text.customer" required>
              <template #default="{ field }">
                <Input
                  :model-value="field.state.value"
                  :placeholder="text.customerPlaceholder"
                  @update:model-value="field.handleChange"
                  @blur="field.handleBlur"
                />
              </template>
            </FormField>

            <FormField name="mrr" :label="text.mrr">
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

            <FormField name="status" :label="text.status">
              <template #default="{ field }">
                <Select
                  :model-value="field.state.value"
                  :options="statusOptions"
                  :placeholder="text.status"
                  :clearable="false"
                  @update:model-value="(value: string) => field.handleChange(value as OrderStatus)"
                />
              </template>
            </FormField>

            <div class="flex justify-end gap-(--bs-gap-md)">
              <Button variant="ghost" @click="emit('close')">{{ text.cancel }}</Button>
              <Button type="submit">{{ text.save }}</Button>
            </div>
          </Form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
