<script setup lang="ts">
// A wide table rides a scrolling lane instead of becoming its own
// scroll container — the table-as-scroll-container form is what ate
// the mouse wheel over plain tables. The lane stays a plain, transparent
// block until its table actually overflows; only then does it claim
// `overflow-x: auto`, re-checked whenever the lane resizes.
defineOptions({ inheritAttrs: false });

const lane = ref<HTMLElement | null>(null);
let observer: ResizeObserver | null = null;

const check = () => {
  lane.value?.toggleAttribute("data-scrollable", lane.value.scrollWidth > lane.value.clientWidth);
};

onMounted(() => {
  if (!lane.value) return;
  check();
  observer = new ResizeObserver(check);
  observer.observe(lane.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <div ref="lane" data-table-scroll>
    <table v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>
