<script setup lang="ts">
const app = useAppConfig();
</script>

<template>
  <span class="bs-docs-brand-lockup">
    <span class="bs-docs-brand-mark" aria-hidden="true" />
    <span class="bs-docs-brand-name">{{ app.docs.name }}</span>
  </span>
</template>
