<script setup lang="ts">
import { ToggleGroup } from "@bysages/vue";

const aligns = [
  { value: "left", label: "Align left", icon: "text-align-start" },
  { value: "center", label: "Align center", icon: "text-align-center" },
  { value: "right", label: "Align right", icon: "text-align-end" },
  { value: "justify", label: "Align justified", icon: "text-align-justify" },
];
</script>

<template>
  <ToggleGroup label="Text alignment" :items="aligns" :default-value="['left']" />
</template>
