<script setup lang="ts">
import { RadioGroup } from "@bysages/vue";

const papers = [
  { value: "xuan", label: "Xuan paper" },
  { value: "silk", label: "Silk" },
  { value: "bamboo", label: "Bamboo slips" },
];
</script>

<template>
  <RadioGroup.Root default-value="xuan">
    <RadioGroup.Label>Ground</RadioGroup.Label>
    <RadioGroup.Item v-for="p in papers" :key="p.value" :value="p.value">
      <RadioGroup.ItemControl />
      <RadioGroup.ItemText>{{ p.label }}</RadioGroup.ItemText>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>
