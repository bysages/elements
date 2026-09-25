<script setup lang="ts">
import { AiAction } from "@bysages/vue";
</script>

<template>
  <!-- The quiet row under a message: copy, retry, and the two ways a
       reader can answer. -->
  <div class="flex gap-2">
    <AiAction label="Copy">✎</AiAction>
    <AiAction label="Retry">↻</AiAction>
    <AiAction label="Helpful">👍</AiAction>
    <AiAction label="Not helpful">👎</AiAction>
  </div>
</template>
