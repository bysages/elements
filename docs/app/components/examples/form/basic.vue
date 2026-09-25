<script setup lang="ts">
import { Button, Form, FormField, Input, Textarea } from "@bysages/vue";
import { reactive, ref } from "vue";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "The title is required."),
  abstract: z.string().min(8, "Write at least 8 characters."),
});

const state = reactive({ title: "", abstract: "" });
const status = ref("");
</script>

<template>
  <Form
    :schema="schema"
    :state="state"
    class="w-full"
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
  <p role="status" class="mt-3 text-sm text-tertiary">
    {{ status }}
  </p>
</template>
