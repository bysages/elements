<script setup lang="ts">
import {
  Button,
  CheckboxGroup,
  Form,
  FormField,
  Input,
  Switch,
  Textarea,
  useForm,
} from "@bysages/vue";
import { ref } from "vue";
import { z } from "zod";

const status = ref("");

const topics = [
  { label: "Typography", value: "typography" },
  { label: "Lighting", value: "lighting" },
  { label: "Motion", value: "motion" },
];

const form = useForm({
  defaultValues: {
    title: "",
    summary: "",
    topics: [] as string[],
    consent: false,
  },
  validators: {
    onChange: z.object({
      title: z.string().min(1, "The title is required."),
      summary: z.string().min(8, "Write at least 8 characters."),
      topics: z.array(z.string()).min(1, "Pick at least one topic."),
      consent: z.boolean().refine((v) => v, "Please accept the terms."),
    }),
  },
  onSubmit: () => {
    status.value = "Submitted.";
  },
});
</script>

<template>
  <Form :form="form" class="w-full">
    <FormField name="title" label="Title" required>
      <template #default="{ field }">
        <Input
          :model-value="field.state.value"
          placeholder="Title of the piece"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
        />
      </template>
    </FormField>
    <FormField name="summary" label="Summary" hint="A few sentences">
      <template #default="{ field }">
        <Textarea
          :model-value="field.state.value"
          placeholder="What the piece says"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
        />
      </template>
    </FormField>
    <FormField name="topics" label="Topics" required>
      <template #default="{ field }">
        <CheckboxGroup
          :model-value="field.state.value"
          :options="topics"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
        />
      </template>
    </FormField>
    <FormField name="consent">
      <template #default="{ field }">
        <Switch
          :model-value="field.state.value"
          label="I accept the terms"
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
