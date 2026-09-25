<template>
  <div class="example-canvas">
    <slot />
  </div>
</template>

<style scoped>
/* The stage an example plays on: one hairline and the vessel radius
 * separate the demo from the page that hosts it — an app flush against
 * the prose reads as broken layout, not as a product. Also the
 * containment context examples query against. */
.example-canvas {
  container-type: inline-size;
  background: var(--bs-color-surface-0);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  overflow: clip;
}
</style>
