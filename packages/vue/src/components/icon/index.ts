import { injectComponentStyle } from "@bysages/core";
import { getIcon } from "@bysages/icons";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and no
 * size of its own. Bring a glyph through `name` from the registry, or
 * bring your own; the well renders either. */
export interface IconProps {
  /** Size steps follow the surrounding font size; `inherit` is the
   * default — one em of the text the icon sits in. */
  size?: "inherit" | "sm" | "md" | "lg";
  /** The accessible name. Without it the icon is presentation-only and
   * hidden from the accessibility tree. */
  label?: string;
  /** A glyph from the registry. Ignored when a default slot is given —
   * an explicit glyph always wins over the registry. */
  name?: string;
}

export const Icon = defineComponent({
  name: "Icon",
  props: {
    /** Size steps follow the surrounding font size; `inherit` is the
     * default — one em of the text the icon sits in. */
    size: { type: String, default: "inherit" },
    /** The accessible name. Without it the icon is presentation-only and
     * hidden from the accessibility tree. */
    label: { type: String, default: undefined },
    /** A glyph from the registry. Ignored when a default slot is given —
     * an explicit glyph always wins over the registry. */
    name: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("icon");

    return () => {
      const brought = ctx.slots.default != null;
      const glyph = props.name && !brought ? getIcon(props.name) : undefined;
      if (props.name && !brought && !glyph) {
        console.error(
          `[icons] unknown icon name "${props.name}" — extend packages/icons/icons.config.json and rerun the generator`,
        );
      }
      const glyphNode = glyph
        ? h("svg", {
            viewBox: `0 0 ${glyph.width ?? 24} ${glyph.height ?? 24}`,
            "aria-hidden": "true",
            innerHTML: glyph.body,
          })
        : null;
      return h(
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
        glyphNode ?? ctx.slots.default?.(),
      );
    };
  },
});
