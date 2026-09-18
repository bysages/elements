<script setup lang="ts">
import { DynamicInput } from "@bysages/vue";
import { ref } from "vue";

const codes = ref<string[]>(["QH-01", "CL-02"]);
</script>

<template>
  <div style="display: grid; gap: var(--bs-space-3); max-inline-size: 24rem">
    <DynamicInput v-model="codes" :min="1" :max="3" add-label="Add code" placeholder="Code" />
    <p style="margin: 0; font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary)">
      Between 1 and 3 codes
    </p>
  </div>
</template>
