<script setup lang="ts">
import { Field } from "@bysages/vue";
import { ref } from "vue";

const email = ref("");
</script>

<template>
  <Field
    v-model="email"
    label="Email"
    description="We only write about your orders."
    placeholder="lin@example.com"
    required
  />
</template>
