<script setup lang="ts">
const { t } = useDocsI18n();
defineProps<{ id?: string }>();
</script>

<template>
  <h2 :id="id">
    <a v-if="id" :href="`#${id}`" class="bs-docs-anchor" :aria-label="t('docs.anchor')">#</a>
    <slot />
  </h2>
</template>
