import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";

export interface SpotlightProps {
  /** How far the lamp throws before the ink swallows it. */
  radius?: string;
}

/** The ink-light card: a vessel whose rim and face take light from the
 * reader's hand. The wrapper only measures and writes the geometry —
 * the lamp itself is the two layers the stylesheet paints. */
export const Spotlight = withSelfRoot(
  defineComponent({
    name: "SSpotlight",
    props: {
      radius: { type: String, default: undefined },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("spotlight");

      const track = (event: PointerEvent) => {
        const host = event.currentTarget as HTMLElement;
        const rect = host.getBoundingClientRect();
        host.style.setProperty("--bs-spot-x", `${event.clientX - rect.left}px`);
        host.style.setProperty("--bs-spot-y", `${event.clientY - rect.top}px`);
      };

      return () =>
        h(
          "div",
          {
            ...ctx.attrs,
            "data-scope": "spotlight",
            "data-part": "root",
            style: props.radius ? { "--bs-spot-radius": props.radius } : undefined,
            onPointermove: track,
            onPointerenter: (event: PointerEvent) => {
              track(event);
              (event.currentTarget as HTMLElement).setAttribute("data-hovered", "");
            },
            onPointerleave: (event: PointerEvent) => {
              (event.currentTarget as HTMLElement).removeAttribute("data-hovered");
            },
          },
          ctx.slots.default?.(),
        );
    },
  }),
);
