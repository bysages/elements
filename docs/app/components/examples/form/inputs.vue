<script setup lang="ts">
import { Button, CheckboxGroup, Form, FormField, Input, Switch, Textarea } from "@bysages/vue";
import { reactive, ref } from "vue";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "The title is required."),
  summary: z.string().min(8, "Write at least 8 characters."),
  topics: z.array(z.string()).min(1, "Pick at least one topic."),
  consent: z.boolean().refine((v) => v, "Please accept the terms."),
});

const state = reactive({
  title: "",
  summary: "",
  topics: [] as string[],
  consent: false,
});
const status = ref("");

const topics = [
  { label: "Typography", value: "typography" },
  { label: "Lighting", value: "lighting" },
  { label: "Motion", value: "motion" },
];
</script>

<template>
  <Form
    :schema="schema"
    :state="state"
    class="w-full"
    @submit="status = 'Submitted.'"
    @error="status = 'Fix the errors below.'"
  >
    <FormField name="title" label="Title" required>
      <Input v-model="state.title" placeholder="Title of the piece" />
    </FormField>
    <FormField name="summary" label="Summary" hint="A few sentences">
      <Textarea v-model="state.summary" placeholder="What the piece says" />
    </FormField>
    <FormField name="topics" label="Topics" required>
      <CheckboxGroup v-model="state.topics" :options="topics" />
    </FormField>
    <FormField name="consent">
      <Switch.Root :checked="state.consent" @update:checked="state.consent = $event">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>I accept the terms</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    </FormField>
    <Button type="submit">Submit</Button>
  </Form>
  <p role="status" class="mt-3 text-sm text-tertiary">
    {{ status }}
  </p>
</template>
