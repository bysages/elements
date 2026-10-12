<script setup lang="ts">
import { DatePicker } from "@bysages/vue";
</script>

<template>
  <DatePicker
    selection-mode="range"
    label="Report period"
    placeholder="yyyy-mm-dd"
    :presets="[
      { label: 'Last 7 days', value: 'last7Days' },
      { label: 'Last 30 days', value: 'last30Days' },
      { label: 'This month', value: 'thisMonth' },
    ]"
  />
</template>
