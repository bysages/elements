<script setup lang="ts">
import { DynamicInput } from "@bysages/vue";
import { ref } from "vue";

const codes = ref<string[]>(["QH-01", "CL-02"]);
</script>

<template>
  <div class="grid gap-3 max-w-96">
    <DynamicInput v-model="codes" :min="1" :max="3" add-label="Add code" placeholder="Code" />
    <p class="m-0 text-sm text-tertiary">Between 1 and 3 codes</p>
  </div>
</template>
