<script setup lang="ts">
import { Button, Form, FormField, Input, Textarea } from "@bysages/vue";
import { reactive, ref } from "vue";

const state = reactive({ title: "", abstract: "" });
const formRef = ref();
</script>

<template>
  <Form
    ref="formRef"
    :state="state"
    :validate="
      (v) => {
        const errors: { name: string; message: string }[] = [];
        if (!v.title) errors.push({ name: 'title', message: 'Title is required' });
        if (!v.abstract) errors.push({ name: 'abstract', message: 'The abstract is required' });
        else if (v.abstract.length < 8)
          errors.push({ name: 'abstract', message: 'At least 8 characters' });
        return errors;
      }
    "
    style="inline-size: 100%"
  >
    <FormField name="title" label="Title" hint="One line, no period">
      <Input v-model="state.title" placeholder="Title of the piece" />
    </FormField>
    <FormField name="abstract" label="Abstract" hint="A few sentences">
      <Textarea v-model="state.abstract" placeholder="What the piece says" />
    </FormField>
    <Button type="submit">Submit</Button>
  </Form>
</template>
