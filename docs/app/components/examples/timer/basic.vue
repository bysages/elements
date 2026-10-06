<script setup lang="ts">
import { Timer } from "@bysages/vue";
</script>

<template>
  <Timer :start-ms="18 * 60 * 1000 + 42 * 1000" label="Session timer" />
</template>
