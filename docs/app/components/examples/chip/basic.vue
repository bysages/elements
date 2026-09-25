<script setup lang="ts">
import { Chip } from "@bysages/vue";
</script>

<template>
  <div class="flex gap-6 items-center">
    <span class="relative inline-flex">
      Inbox
      <Chip :value="8" />
    </span>
  </div>
</template>
