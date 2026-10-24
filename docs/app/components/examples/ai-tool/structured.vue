<script setup lang="ts">
import { AiTool } from "@bysages/vue";

const input = { query: "paper stock", limit: 5 };
const output = { hits: 12, sources: ["catalog", "archive"] };
</script>

<template>
  <div class="grid w-full gap-3">
    <AiTool
      name="search_web"
      status="completed"
      default-open
      :input-value="input"
      :output-value="output"
    />
  </div>
</template>
