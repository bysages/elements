import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, onMounted, onScopeDispose, ref, type PropType } from "vue";

/** Content that waits to be worth rendering: the slot stays off the
 * tree until the placeholder scrolls near the viewport, then mounts
 * once and stays. The placeholder is drawn by the caller through the
 * placeholder slot, so the late arrival costs no layout shift it
 * cannot predict. */
export const DeferredContent = defineComponent({
  name: "DeferredContent",
  props: {
    /** How much of the placeholder must be visible before the content
     * mounts, from 0 (any pixel) to 1 (the whole box). */
    threshold: { type: Number as PropType<number>, default: 0.2 },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("deferred-content");

    const host = ref<HTMLElement | null>(null);
    const active = ref(false);
    let observer: IntersectionObserver | undefined;
    onMounted(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            active.value = true;
            observer?.disconnect();
          }
        },
        { threshold: props.threshold },
      );
      if (host.value) observer.observe(host.value);
    });
    onScopeDispose(() => observer?.disconnect());
    return () =>
      h(
        "div",
        { ref: host, ...ctx.attrs, "data-scope": "deferred-content", "data-part": "root" },
        active.value ? ctx.slots.default?.() : ctx.slots.placeholder?.(),
      );
  },
});
