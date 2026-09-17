import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** A frame that keeps its shape: the box holds the given ratio whatever
 * the width it is dealt, and the child fills the frame it is given. */
export interface AspectRatioProps {
  /** A CSS `aspect-ratio` value — "16 / 9", "4 / 3", "1 / 1". */
  ratio?: string;
}

export const AspectRatio = defineComponent({
  name: "AspectRatio",
  props: {
    ratio: { type: String, default: "1 / 1" },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const { style, ...attrs } = ctx.attrs;
      return h(
        "div",
        {
          ...attrs,
          style: [style as CSSProperties, { "--bs-aspect-ratio": props.ratio }],
          "data-scope": "aspect-ratio",
          "data-part": "root",
        },
        ctx.slots.default?.(),
      );
    };
  },
});

injectComponentStyle("aspect-ratio");
