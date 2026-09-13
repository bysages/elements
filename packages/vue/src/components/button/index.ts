import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The control recipe as a standalone button: the variant chooses how it
 * rests, the tone chooses the pigment. Ink is the solemn default; any
 * action can carry the primary weight. */
export const Button = defineComponent({
  name: "Button",
  props: {
    variant: { type: String, default: "solid" },
    tone: { type: String, default: "ink" },
    size: { type: String, default: "md" },
    disabled: { type: Boolean, default: false },
  },
  setup(props, ctx: SetupContext<{ default: () => unknown }>) {
    return () =>
      h(
        "button",
        {
          type: "button",
          disabled: props.disabled,
          ...ctx.attrs,
          "data-scope": "button",
          "data-part": "root",
          "data-variant": props.variant,
          "data-tone": props.tone,
          "data-size": props.size,
          // Press feedback and pointer light ride motion attributes, so
          // consumers can detach them per element too.
          "data-motion": "ink-ripple lit",
        },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("button");
