<script setup lang="ts">
defineProps<{
  orientation?: "vertical" | "horizontal";
  reverse?: boolean;
}>();
</script>

<template>
  <section
    class="bs-docs-section"
    :class="{
      'bs-docs-section--horizontal': orientation === 'horizontal',
      'bs-docs-section--reverse': reverse,
    }"
  >
    <div class="bs-docs-section-main">
      <header v-if="$slots.title || $slots.description" class="bs-docs-section-head">
        <h2 v-if="$slots.title">
          <slot name="title" />
        </h2>
        <p v-if="$slots.description">
          <slot name="description" />
        </p>
        <div v-if="$slots.links" class="bs-docs-section-links">
          <slot name="links" />
        </div>
      </header>
      <!-- MDC has no way back to the default slot once a named one opens,
           so prose-level content (code blocks, groups) travels in `#body`.
           Empty slots also render differently on the server (a
           double-comment fragment) and the client (one comment) — guard
           every slot so the element itself is absent when the slot is. -->
      <div v-if="$slots.body" class="bs-docs-section-body">
        <slot name="body" />
      </div>
    </div>
    <!-- Cards ride below the main lane, full width. -->
    <div v-if="$slots.cards" class="bs-docs-cards">
      <slot name="cards" />
    </div>
  </section>
</template>
