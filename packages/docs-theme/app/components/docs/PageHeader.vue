<script setup lang="ts">
defineProps<{
  page?: { title?: string; description?: string } | null;
  headline?: string;
}>();
</script>

<template>
  <header class="bs-docs-page-header">
    <p v-if="headline" class="bs-docs-page-headline">{{ headline }}</p>
    <h1>{{ page?.title }}</h1>
    <p v-if="page?.description" class="bs-docs-page-description">{{ page.description }}</p>
  </header>
</template>
