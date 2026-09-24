<script setup lang="ts">
import { Button, Form, FormField, Input, Textarea } from "@bysages/vue";
import { reactive, ref } from "vue";

const state = reactive({ title: "", abstract: "" });
const status = ref("");

function validate(v: Record<string, unknown>) {
  const errors: { name: string; message: string }[] = [];
  if (!v.title) errors.push({ name: "title", message: "Title is required" });
  if (!v.abstract) errors.push({ name: "abstract", message: "The abstract is required" });
  else if (v.abstract.length < 8)
    errors.push({ name: "abstract", message: "At least 8 characters" });
  return errors;
}
</script>

<template>
  <Form
    :state="state"
    :validate="validate"
    style="inline-size: 100%"
    @submit="status = 'Submitted.'"
    @error="status = 'Fix the errors below.'"
  >
    <FormField name="title" label="Title" hint="One line, no period" required>
      <Input v-model="state.title" placeholder="Title of the piece" />
    </FormField>
    <FormField name="abstract" label="Abstract">
      <Textarea v-model="state.abstract" placeholder="What the piece says" />
    </FormField>
    <Button type="submit">Submit</Button>
  </Form>
  <p
    role="status"
    style="
      margin-block-start: var(--bs-space-3);
      font-size: var(--bs-font-size-sm);
      color: var(--bs-color-text-tertiary);
    "
  >
    {{ status }}
  </p>
</template>
