<script setup lang="ts">
import { Button, Form, FormField, Input, Textarea, useForm } from "@bysages/vue";
import { ref } from "vue";

const status = ref("");

const form = useForm({
  defaultValues: { title: "", abstract: "" },
  onSubmit: () => {
    status.value = "Submitted.";
  },
});

const titleValidators = {
  onChange: ({ value }: { value: string }) => (value ? undefined : "Title is required"),
};

const abstractValidators = {
  onChange: ({ value }: { value: string }) => {
    if (!value) return "The abstract is required";
    if (value.length < 8) return "At least 8 characters";
    return undefined;
  },
};
</script>

<template>
  <Form :form="form" class="w-full">
    <FormField
      name="title"
      label="Title"
      hint="One line, no period"
      required
      :validators="titleValidators"
    >
      <template #default="{ field }">
        <Input
          :model-value="field.state.value"
          placeholder="Title of the piece"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
        />
      </template>
    </FormField>
    <FormField name="abstract" label="Abstract" :validators="abstractValidators">
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
