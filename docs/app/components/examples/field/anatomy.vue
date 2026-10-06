<script setup lang="ts">
import { Field } from "@bysages/vue";
</script>

<template>
  <Field.Root required>
    <Field.Label>
      Display name
      <Field.RequiredIndicator>*</Field.RequiredIndicator>
    </Field.Label>
    <Field.Input placeholder="How you sign your work" />
    <Field.HelperText>Shown beside your published notes.</Field.HelperText>
  </Field.Root>
</template>
