<script setup lang="ts">
import { NavigationMenu } from "@bysages/vue";

const items = [
  { label: "Quick start", href: "#quick-start" },
  { label: "Styling", href: "#styling" },
  { label: "Guides", href: "#guides" },
];
</script>

<template>
  <NavigationMenu :items="items" />
</template>
