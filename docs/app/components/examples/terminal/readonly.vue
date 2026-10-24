<script setup lang="ts">
import { Terminal } from "@bysages/vue";
</script>

<template>
  <Terminal
    :lines="['session started', 'watching build output…', 'build completed']"
    read-only
    label="Build output"
    class="w-full max-w-xl"
  />
</template>
