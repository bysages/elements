import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { cloneVNode, defineComponent, h } from "vue";

/** The control recipe as a standalone button: the variant chooses how it
 * rests, the tone chooses the pigment. Ink is the solemn default; any
 * action can carry the primary weight. */
export const Button = defineComponent({
  name: "Button",
  props: {
    variant: { type: String, default: "solid" },
    tone: { type: String, default: "ink" },
    size: { type: String, default: "md" },
    /** Icon-only: the silhouette squares to the control height. */
    square: { type: Boolean, default: false },
    /** Render the slot's element as the button — the recipe rides on it
     * (a NuxtLink, say) instead of wrapping it in a nested <button>. */
    asChild: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, ctx: SetupContext<{ default: () => unknown }>) {
    const partProps = () => ({
      ...ctx.attrs,
      "data-scope": "button",
      "data-part": "root",
      "data-variant": props.variant,
      "data-tone": props.tone,
      "data-size": props.size,
      "data-square": props.square ? "true" : undefined,
      // Press feedback and pointer light ride motion attributes, so
      // consumers can detach them per element too.
      "data-motion": "ink-ripple lit",
    });

    if (props.asChild) {
      return () => {
        const child = ctx.slots.default?.()[0];
        return child ? cloneVNode(child, partProps()) : null;
      };
    }

    return () =>
      h(
        "button",
        { type: "button", disabled: props.disabled, ...partProps() },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("button");
