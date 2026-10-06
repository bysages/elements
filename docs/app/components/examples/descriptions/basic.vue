<script setup lang="ts">
import { Descriptions } from "@bysages/vue";

const facts = [
  { term: "Paper", detail: "Warm ground" },
  { term: "Ink", detail: "Content first" },
  { term: "Light", detail: "Shadow as hierarchy" },
];
</script>

<template>
  <Descriptions :items="facts" />
</template>
