<script setup lang="ts">
import { Button, Form, FormField, Input, Textarea, useForm } from "@bysages/vue";
import { ref } from "vue";
import { z } from "zod";

const status = ref("");

const form = useForm({
  defaultValues: { title: "", abstract: "" },
  validators: {
    onChange: z.object({
      title: z.string().min(1, "The title is required."),
      abstract: z.string().min(8, "Write at least 8 characters."),
    }),
  },
  onSubmit: () => {
    status.value = "Submitted.";
  },
});
</script>

<template>
  <Form :form="form" class="w-full">
    <FormField name="title" label="Title" hint="One line, no period" required>
      <template #default="{ field }">
        <Input
          :model-value="field.state.value"
          placeholder="Title of the piece"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
        />
      </template>
    </FormField>
    <FormField name="abstract" label="Abstract">
      <template #default="{ field }">
        <Textarea
          :model-value="field.state.value"
          placeholder="What the piece says"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
        />
      </template>
    </FormField>
    <Button type="submit">Submit</Button>
  </Form>
  <p role="status" class="mt-3 text-sm text-tertiary">
    {{ status }}
  </p>
</template>
