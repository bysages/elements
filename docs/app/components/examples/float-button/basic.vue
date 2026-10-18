<script setup lang="ts">
import { FloatButton } from "@bysages/vue";

const actions = [
  { label: "Compose", icon: "pencil" },
  { label: "Delete", icon: "x" },
];
</script>

<template>
  <FloatButton label="Actions" :actions="actions" default-open />
</template>
