import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";

/** A counting coin: the numeric value, capped at `max` with an ellipsis
 * of the remainder ("99+"). */
export const Chip = withSelfRoot(
  defineComponent({
    name: "Chip",
    props: {
      value: { type: Number, required: true },
      max: { type: Number, default: undefined },
      tone: { type: String, default: "ink" },
      variant: { type: String, default: "solid" },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("chip");

      return () => {
        const text =
          props.max != null && props.value > props.max ? `${props.max}+` : String(props.value);
        return h(
          "span",
          {
            ...ctx.attrs,
            "data-scope": "chip",
            "data-part": "root",
            "data-tone": props.tone,
            "data-variant": props.variant,
          },
          text,
        );
      };
    },
  }),
);
