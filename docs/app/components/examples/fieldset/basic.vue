<script setup lang="ts">
import { Field, Fieldset } from "@bysages/vue";
</script>

<template>
  <Fieldset label="Contact details" description="All fields are required.">
    <Field label="Name" placeholder="John Doe" required />
    <Field label="Email" placeholder="john@example.com" required />
  </Fieldset>
</template>
