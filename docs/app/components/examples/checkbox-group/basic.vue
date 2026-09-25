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
  <div class="grid gap-6 w-full">
    <CheckboxGroup v-model="picked" :options="options" />
    <CheckboxGroup v-model="picked" :options="options" layout="horizontal" />
  </div>
</template>
