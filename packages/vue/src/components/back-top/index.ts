import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";

import { Button } from "../button";

export interface BackTopProps {
  /** How far the reader must have travelled (px) before the affordance
   * appears. */
  threshold?: number;
  /** The accessible name; the control is icon-only by default. */
  label?: string;
}

/**
 * A way home: after the page has scrolled past `threshold`, a small
 * floating control rises at the page's corner and returns the reader to
 * the top. The scroll itself stays native — `window.scrollTo` defers to
 * the stylesheet's `scroll-behavior: smooth`, which reduced motion turns
 * back into an instant jump. The button stays mounted either way so the
 * entrance is a transition, never a pop.
 *
 * The control itself is the shared `Button` (outline, square) — the
 * paper, hairline and halo are its; this family owns only the floating
 * and the entrance.
 */
export const BackTop = defineComponent({
  name: "BackTop",
  props: {
    threshold: { type: Number, default: 400 },
    label: { type: String, default: "Back to top" },
  },
  setup(props, ctx: SetupContext) {
    const visible = ref(false);

    const onScroll = () => {
      visible.value = window.scrollY > props.threshold;
    };

    onMounted(() => {
      if (typeof window === "undefined") return;
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    });

    onBeforeUnmount(() => {
      if (typeof window === "undefined") return;
      window.removeEventListener("scroll", onScroll);
    });

    return () =>
      h(
        "div",
        {
          "data-scope": "back-top",
          "data-part": "root",
          "data-state": visible.value ? "shown" : "hidden",
        },
        [
          h(
            Button,
            {
              ...ctx.attrs,
              variant: "outline",
              square: true,
              size: "lg",
              type: "button",
              "aria-label": props.label,
              "aria-hidden": visible.value ? undefined : "true",
              tabindex: visible.value ? 0 : -1,
              onClick: () => window.scrollTo({ top: 0 }),
            },
            () => ctx.slots.default?.() ?? [chevronUp()],
          ),
        ],
      );
  },
});

/** The single glyph a way-home control needs: one stroke pointing up. */
function chevronUp() {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m6 14 6-6 6 6" })],
  );
}

injectComponentStyle("back-top");
