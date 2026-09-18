<script setup lang="ts">
import { DynamicInput } from "@bysages/vue";
import { ref } from "vue";

const emails = ref<string[]>(["lin@example.com", ""]);
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-3); max-inline-size: 24rem">
    <DynamicInput v-model="emails" placeholder="name@example.com" />
    <p style="margin: 0; font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary)">
      values: {{ JSON.stringify(emails) }}
    </p>
  </div>
</template>
