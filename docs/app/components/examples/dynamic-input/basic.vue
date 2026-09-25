<script setup lang="ts">
import { DynamicInput } from "@bysages/vue";
import { ref } from "vue";

const emails = ref<string[]>(["lin@example.com", ""]);
</script>

<template>
  <div class="grid gap-3 max-w-96">
    <DynamicInput v-model="emails" placeholder="name@example.com" />
    <p class="m-0 text-sm text-tertiary">values: {{ JSON.stringify(emails) }}</p>
  </div>
</template>
