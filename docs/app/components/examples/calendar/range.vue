<script setup lang="ts">
import { parseDate } from "@ark-ui/vue/date-picker";
import { Calendar } from "@bysages/vue";
</script>

<template>
  <Calendar
    selection-mode="range"
    :default-value="[parseDate('2026-09-08'), parseDate('2026-09-19')]"
  />
</template>
