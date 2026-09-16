<script setup lang="ts">
import { Transfer, type TransferItem } from "@bysages/vue";
import { ref } from "vue";

const data: TransferItem[] = [
  { label: "The brush inventory", value: "brush" },
  { label: "Stone seals, catalogued", value: "seals" },
  { label: "Xuan paper samples", value: "xuan", disabled: true },
  { label: "Silk mounting orders", value: "silk" },
  { label: "Ink grind records", value: "ink" },
];

const picked = ref(["ink"]);
</script>

<template>
  <Transfer v-model="picked" :data="data" :titles="['In the study', 'On exhibition']" searchable />
</template>
