<script setup lang="ts">
import { CheckboxGroup } from "@bysages/vue";
import { ref } from "vue";

const picked = ref(["ink"]);
const options = [
  { label: "Ink", value: "ink" },
  { label: "Brush", value: "brush" },
  { label: "Paper", value: "paper", disabled: true },
];
</script>

<template>
  <div style="display: grid; gap: 1.5rem; inline-size: 100%">
    <CheckboxGroup v-model="picked" :options="options" />
    <CheckboxGroup v-model="picked" :options="options" layout="horizontal" />
  </div>
</template>
