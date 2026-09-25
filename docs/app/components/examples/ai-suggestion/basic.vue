<script setup lang="ts">
import { AiPromptInput, AiSuggestion } from "@bysages/vue";
import { ref } from "vue";

const prompt = ref("");
</script>

<template>
  <!-- Selecting a chip drafts it into the prompt vessel below. -->
  <div class="grid gap-4 w-full">
    <div class="flex flex-wrap gap-2">
      <AiSuggestion prompt="Summarize the release" @select="prompt = $event" />
      <AiSuggestion prompt="What changed in core?" @select="prompt = $event" />
    </div>
    <AiPromptInput v-model="prompt" />
  </div>
</template>
