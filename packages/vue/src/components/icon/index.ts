import { injectComponentStyle } from "@bysages/core";
import { getIcon } from "@bysages/core/icons";
import type { IconifyIcon } from "@bysages/core/icons";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The inkwell: a standard box that keeps any inline svg at its optical
 * measure and in the text's own ink — the icon carries no pigment and no
 * size of its own. Bring a glyph through `glyph` (a direct registry
 * import), through `name` from the whitelisted registry, or bring your
 * own; the well renders either. */
export interface IconProps {
  /** Size steps follow the surrounding font size; `inherit` is the
   * default — one em of the text the icon sits in. */
  size?: "inherit" | "sm" | "md" | "lg";
  /** The accessible name. Without it the icon is presentation-only and
   * hidden from the accessibility tree. */
  label?: string;
  /** A glyph from the registry, imported directly. Ignored when a
   * default slot is given — an explicit glyph always wins. */
  glyph?: IconifyIcon;
  /** A registry name — only the whitelisted set the wrappers draw
   * themselves. Ignored when `glyph` or a default slot is given. */
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
    /** A glyph from the registry, imported directly. Ignored when a
     * default slot is given — an explicit glyph always wins. */
    glyph: { type: Object, default: undefined },
    /** A registry name — only the whitelisted set the wrappers draw
     * themselves. Ignored when `glyph` or a default slot is given. */
    name: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("icon");

    return () => {
      const brought = ctx.slots.default != null;
      const glyph = props.glyph ?? (props.name && !brought ? getIcon(props.name) : undefined);
      if (props.name && !brought && props.glyph == null && !glyph) {
        console.error(
          `[icons] unknown icon name "${props.name}" — not in the wrappers' whitelist; import the glyph from @bysages/icons and pass it as glyph`,
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
