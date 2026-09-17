import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

/**
 * Buttons fused into one control: the group owns only the joinery, so
 * members keep every variant they were given — a solid action can sit
 * beside an outline one and the seam still reads. Selection belongs to
 * the toggle group; this is layout alone.
 */
const Root = defineComponent({
  name: "ButtonGroup",
  props: {
    /** The seam runs across the group (default) or down it. */
    orientation: { type: String as PropType<"horizontal" | "vertical">, default: "horizontal" },
    /** One register for every member: falls onto data-size for the
     * stylesheet to retune the buttons' heights. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          role: "group",
          "data-scope": "button-group",
          "data-part": "root",
          "data-orientation": props.orientation,
          "data-size": props.size,
        },
        ctx.slots.default?.(),
      );
  },
});

export const ButtonGroup = Object.assign(Root, { Root });

injectComponentStyle("button-group");
