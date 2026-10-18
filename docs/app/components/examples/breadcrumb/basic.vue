<script setup lang="ts">
import { Breadcrumb } from "@bysages/vue";

const items = [
  { label: "Home", href: "#home" },
  { label: "Library", href: "#library" },
  { label: "Archives" },
];
</script>

<template>
  <Breadcrumb :items="items" />
</template>
