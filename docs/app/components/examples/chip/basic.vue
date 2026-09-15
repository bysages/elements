<script setup lang="ts">
import { Chip } from "@bysages/vue";
</script>

<template>
  <div style="display: flex; gap: 1.5rem; align-items: center">
    <span style="position: relative; display: inline-flex">
      Inbox
      <Chip :value="8" />
    </span>
  </div>
</template>
