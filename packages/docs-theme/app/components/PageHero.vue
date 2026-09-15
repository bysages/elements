<script setup lang="ts">
defineProps<{
  orientation?: "vertical" | "horizontal";
  reverse?: boolean;
}>();
</script>

<template>
  <section
    class="bs-docs-hero"
    :class="{
      'bs-docs-hero--horizontal': orientation === 'horizontal',
      'bs-docs-hero--reverse': reverse,
    }"
  >
    <div class="bs-docs-hero-head">
      <h1 v-if="$slots.title" class="bs-docs-hero-title">
        <slot name="title" />
      </h1>
      <p v-if="$slots.description" class="bs-docs-hero-description">
        <slot name="description" />
      </p>
      <div v-if="$slots.links" class="bs-docs-hero-links">
        <slot name="links" />
      </div>
    </div>
    <!-- MDC has no way back to the default slot once a named one opens, so
         the demo pane travels in `#body`. Empty slots also render
         differently on the server (a double-comment fragment) and the
         client (one comment) — guard every slot so the element itself is
         absent when the slot is. -->
    <div v-if="$slots.body" class="bs-docs-hero-body">
      <slot name="body" />
    </div>
  </section>
</template>
