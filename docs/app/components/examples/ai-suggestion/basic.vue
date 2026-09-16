<script setup lang="ts">
import { AiPromptInput, AiSuggestion } from "@bysages/vue";
import { ref } from "vue";

const prompt = ref("");
</script>

<template>
  <!-- Selecting a chip drafts it into the prompt vessel below. -->
  <div style="display: grid; gap: 1rem; inline-size: 100%">
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem">
      <AiSuggestion prompt="Summarize the release" @select="prompt = $event" />
      <AiSuggestion prompt="What changed in core?" @select="prompt = $event" />
    </div>
    <AiPromptInput v-model="prompt" />
  </div>
</template>
