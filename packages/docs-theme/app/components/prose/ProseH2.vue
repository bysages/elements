<script setup lang="ts">
defineProps<{ id?: string }>();
</script>

<template>
  <h2 :id="id">
    <a v-if="id" :href="`#${id}`" class="bs-docs-anchor" aria-label="Link to this section">#</a>
    <slot />
  </h2>
</template>
