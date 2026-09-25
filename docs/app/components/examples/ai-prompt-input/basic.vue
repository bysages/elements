<script setup lang="ts">
import { AiPromptInput } from "@bysages/vue";
import { ref } from "vue";

const prompt = ref("");
const sent = ref("");
</script>

<template>
  <!-- The prompt vessel alone: controlled, self-growing, Enter to send. -->
  <div class="grid gap-3 w-full">
    <AiPromptInput
      v-model="prompt"
      @submit="
        sent = $event;
        prompt = '';
      "
    />
    <p class="m-0 text-tertiary text-sm">
      {{ sent ? `Sent: ${sent}` : "Type and press Enter." }}
    </p>
  </div>
</template>
