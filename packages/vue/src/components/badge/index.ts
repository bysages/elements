import { injectComponentStyle } from "@bysages/core/styling";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";

/** A small seal of state. Ink is the neutral tone; the four semantic
 * pigments are fixed. Subtle and outline re-register the same pigment. */
export const Badge = withSelfRoot(
  defineComponent({
    name: "Badge",
    props: {
      tone: {
        type: String as PropType<"ink" | "primary" | "success" | "warning" | "danger" | "info">,
        default: "ink",
      },
      variant: { type: String as PropType<"solid" | "subtle" | "outline">, default: "solid" },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("badge");

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
  }),
);
