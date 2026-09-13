import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The paper-ink hairline as a component: a named rule between sections.
 * Decorative separators drop the separator role, since the page reads
 * fine without them. */
export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Separator = defineComponent({
  name: "Separator",
  props: {
    orientation: { type: String, default: "horizontal" },
    decorative: { type: Boolean, default: false },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h("div", {
        ...ctx.attrs,
        role: props.decorative ? "none" : "separator",
        "data-scope": "separator",
        "data-part": "root",
        "data-orientation": props.orientation,
        "aria-orientation": props.decorative ? undefined : props.orientation,
      });
  },
});

injectComponentStyle("separator");
