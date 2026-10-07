<script setup lang="ts">
import { Button } from "@bysages/vue";

const { t } = useDocsI18n();
</script>

<template>
  <Button variant="ghost" size="sm" square :aria-label="t('docs.menu')">
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  </Button>
</template>
