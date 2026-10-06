<script setup lang="ts">
import { Listbox } from "@bysages/vue";
import { ref } from "vue";

const options = [
  { label: "Qinghua cobalt", value: "qinghua" },
  { label: "Celadon", value: "celadon" },
  { label: "Zhusha cinnabar", value: "zhusha" },
];

const value = ref("qinghua");
</script>

<template>
  <Listbox v-model="value" :options="options" label="Accent" />
</template>
