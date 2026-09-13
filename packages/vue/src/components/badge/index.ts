import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** A small seal of state. Ink is the neutral tone; the four semantic
 * pigments are fixed. Subtle and outline re-register the same pigment. */
export const Badge = defineComponent({
  name: "Badge",
  props: {
    tone: { type: String, default: "ink" },
    variant: { type: String, default: "solid" },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "span",
        {
          ...ctx.attrs,
          "data-scope": "badge",
          "data-part": "root",
          "data-tone": props.tone,
          "data-variant": props.variant,
        },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("badge");
