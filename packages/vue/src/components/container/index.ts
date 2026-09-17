import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The reading frame: content held to a measure and centered on the
 * page. The sizes name typographic measures, not breakpoints — the page
 * owns its edges, the container only owns how long a line of ink runs. */
export interface ContainerProps {
  size?: "narrow" | "readable" | "wide" | "full";
  /** Keep the ink off the page edges when the viewport runs narrower
   * than the measure. */
  padding?: boolean;
}

export const Container = defineComponent({
  name: "Container",
  props: {
    size: { type: String, default: "readable" },
    padding: { type: Boolean, default: true },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "container",
          "data-part": "root",
          "data-size": props.size,
          "data-padding": props.padding ? "" : undefined,
        },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("container");
