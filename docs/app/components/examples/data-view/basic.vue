<script setup lang="ts">
import { Avatar, DataView } from "@bysages/vue";

const records = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  title: `Ledger entry ${index + 1}`,
}));
</script>

<template>
  <DataView :items="records" :page-size="6" class="w-full">
    <template #item="{ item }">
      <div class="flex items-center gap-3 py-2 text-sm">
        <Avatar.Root size="sm">
          <Avatar.Fallback>{{ item.id }}</Avatar.Fallback>
        </Avatar.Root>
        <span>{{ item.title }}</span>
      </div>
    </template>
  </DataView>
</template>
