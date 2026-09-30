<script setup lang="ts">
const { t } = useDocsI18n();
defineProps<{ id?: string }>();
</script>

<template>
  <h3 :id="id">
    <a v-if="id" :href="`#${id}`" class="bs-docs-anchor" :aria-label="t('docs.anchor')">#</a>
    <slot />
  </h3>
</template>
