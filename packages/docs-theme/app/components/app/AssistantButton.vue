<script setup lang="ts">
import { Button } from "@bysages/vue";

const { open } = useAssistant();
const { t } = useDocsI18n();
</script>

<template>
  <Button
    variant="ghost"
    size="sm"
    square
    :aria-label="t('docs.assistant')"
    :title="t('docs.assistant')"
    @click="open()"
  >
    <Icon name="i-lucide-sparkles" class="bs-docs-rail-icon" />
  </Button>
</template>
