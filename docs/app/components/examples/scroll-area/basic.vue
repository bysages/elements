<script setup lang="ts">
import { ScrollArea } from "@bysages/vue";

const paragraph =
  "Whitespace is not emptiness but breath. The paper carries the ink and the " +
  "light decides the hierarchy.";
</script>

<template>
  <ScrollArea class="h-30">
    <p>{{ paragraph }}</p>
    <p>{{ paragraph }}</p>
    <p>{{ paragraph }}</p>
  </ScrollArea>
</template>
