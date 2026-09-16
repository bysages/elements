<script setup lang="ts">
import { AiTool } from "@bysages/vue";
</script>

<template>
  <!-- The tool call in its states: running and completed. The dot
       pairs color with the word — never color alone. -->
  <div style="display: grid; gap: 0.75rem; inline-size: 100%">
    <AiTool name="search_web" status="running">
      <template #input>{{ '{"query": "paper stock"}' }}</template>
    </AiTool>
    <AiTool name="search_web" status="completed" default-open>
      <template #input>{{ '{"query": "paper stock"}' }}</template>
      <template #output>{{ '{"hits": 12}' }}</template>
    </AiTool>
  </div>
</template>
