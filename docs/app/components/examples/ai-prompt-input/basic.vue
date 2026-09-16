<script setup lang="ts">
import { AiPromptInput } from "@bysages/vue";
import { ref } from "vue";

const prompt = ref("");
const sent = ref("");
</script>

<template>
  <!-- The prompt vessel alone: controlled, self-growing, Enter to send. -->
  <div style="display: grid; gap: 0.75rem; inline-size: 100%">
    <AiPromptInput
      v-model="prompt"
      @submit="
        sent = $event;
        prompt = '';
      "
    />
    <p style="margin: 0; color: var(--bs-color-text-tertiary); font-size: var(--bs-font-size-sm)">
      {{ sent ? `Sent: ${sent}` : "Type and press Enter." }}
    </p>
  </div>
</template>
