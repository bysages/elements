<script setup lang="ts">
import { Select } from "@bysages/vue";
import { ref } from "vue";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const value = ref("vue");
</script>

<template>
  <Select v-model="value" :options="frameworks" label="Framework" group-label="Frameworks" />
</template>
