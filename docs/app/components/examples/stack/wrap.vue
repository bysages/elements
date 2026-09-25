<script setup lang="ts">
import { Stack } from "@bysages/vue";
</script>

<template>
  <!-- A row that has run out of room lays its overflow down a line. -->
  <div class="w-96">
    <Stack direction="row" wrap>
      <div v-for="n in 8" :key="n" class="border border-border bg-surface-3 px-3 py-2 text-sm">
        Item {{ n }}
      </div>
    </Stack>
  </div>
</template>
