import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and no
 * size of its own. Bring the glyph; it ships no set. */
export interface IconProps {
  /** Size steps follow the surrounding font size; `inherit` is the
   * default — one em of the text the icon sits in. */
  size?: "inherit" | "sm" | "md" | "lg";
  /** The accessible name. Without it the icon is presentation-only and
   * hidden from the accessibility tree. */
  label?: string;
}

export const Icon = defineComponent({
  name: "Icon",
  props: {
    size: { type: String, default: "inherit" },
    label: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "span",
        {
          ...ctx.attrs,
          role: props.label != null ? "img" : undefined,
          "aria-label": props.label,
          "aria-hidden": props.label != null ? undefined : "true",
          "data-scope": "icon",
          "data-part": "root",
          "data-size": props.size,
        },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("icon");
