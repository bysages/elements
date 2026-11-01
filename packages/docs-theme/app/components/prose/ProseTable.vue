<script setup lang="ts">
// A wide table rides a scrolling lane instead of becoming its own
// scroll container — the table-as-scroll-container form is what ate
// the mouse wheel over plain tables. The lane starts scrollable so SSR
// cannot clip a wide table; after mount the attribute is claimed only
// while its table actually overflows, re-checked on lane resize.
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
  <div ref="lane" data-table-scroll data-scrollable>
    <table v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>
