<script setup lang="ts">
import { Field, Fieldset } from "@bysages/vue";
</script>

<template>
  <Fieldset.Root>
    <Fieldset.Legend>Contact details</Fieldset.Legend>
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Field.Input placeholder="John Doe" />
    </Field.Root>
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Field.Input type="email" placeholder="john@example.com" />
    </Field.Root>
  </Fieldset.Root>
</template>
