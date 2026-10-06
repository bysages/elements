<script setup lang="ts">
import { Select } from "@bysages/vue";
import { ref } from "vue";

const value = ref("celadon");
const options = [
  { label: "Qinghua cobalt", value: "qinghua" },
  { label: "Celadon", value: "celadon" },
  { label: "Zhusha cinnabar", value: "zhusha" },
];
</script>

<template>
  <Select v-model="value" :options="options" label="Accent pigment" class="w-full" />
</template>
