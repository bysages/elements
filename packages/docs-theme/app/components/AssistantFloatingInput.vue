<script setup lang="ts">
import { Ai } from "@bysages/vue";

const { isOpen, open } = useAssistant();
const { t } = useDocsI18n();
const draft = ref("");
</script>

<template>
  <div v-if="!isOpen" role="region" :aria-label="t('docs.assistantTitle')">
    <Ai.PromptInput
      v-model="draft"
      class="bs-docs-assistant-float"
      :placeholder="t('docs.assistant')"
      @submit="open($event)"
    />
  </div>
</template>
