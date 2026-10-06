<script setup lang="ts">
import { RadioGroup } from "@bysages/vue";

const papers = [
  { value: "xuan", label: "Xuan paper" },
  { value: "silk", label: "Silk" },
  { value: "bamboo", label: "Bamboo slips" },
];
</script>

<template>
  <RadioGroup label="Ground" :items="papers" default-value="xuan" />
</template>
