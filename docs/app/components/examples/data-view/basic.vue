<script setup lang="ts">
import { DataView } from "@bysages/vue";

const records = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  title: `Ledger entry ${index + 1}`,
}));
</script>

<template>
  <DataView :items="records" :page-size="6" class="w-full">
    <template #item="{ item }">
      <span>{{ item.title }}</span>
    </template>
  </DataView>
</template>
