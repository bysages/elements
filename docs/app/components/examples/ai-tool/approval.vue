<script setup lang="ts">
import { AiTool } from "@bysages/vue";
import { ref } from "vue";

const approval = ref<"required" | "approved" | "denied">("required");
</script>

<template>
  <div class="grid w-full gap-3">
    <AiTool
      name="write_file"
      :status="approval === 'approved' ? 'completed' : approval === 'denied' ? 'denied' : 'pending'"
      default-open
      :input-value="{ path: '/notes/colophon.md' }"
      @approve="approval = 'approved'"
      @deny="approval = 'denied'"
    />
  </div>
</template>
