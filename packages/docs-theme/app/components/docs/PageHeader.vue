<script setup lang="ts">
defineProps<{
  page?: { title?: string; description?: string } | null;
  headline?: string;
}>();
</script>

<template>
  <header class="bs-docs-page-header">
    <p
      v-if="headline"
      class="m-0 mb-(--bs-margin-sm) text-sm font-medium tracking-label text-tertiary"
    >
      {{ headline }}
    </p>
    <h1>{{ page?.title }}</h1>
    <p v-if="page?.description" class="m-0 mb-(--bs-margin-2xl) text-lg text-secondary">
      {{ page.description }}
    </p>
  </header>
</template>
