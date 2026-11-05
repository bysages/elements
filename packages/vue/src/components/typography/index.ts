import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { withSelfRoot } from "../../internal/family";

function part(name: string, tag: string) {
  return defineComponent({
    name: "Typography" + name,
    inheritAttrs: false,
    setup(_, ctx: SetupContext) {
      injectComponentStyle("typography");

      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "typography", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

/** A heading voice with explicit hierarchy: `size` rides the token
 * ladder, while `as` maps it to the document's own semantic heading. */
const Heading = defineComponent({
  name: "TypographyHeading",
  inheritAttrs: false,
  props: {
    size: {
      type: String as PropType<"sm" | "md" | "lg" | "xl" | "display">,
      default: undefined,
    },
    as: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("typography");

    return () =>
      h(
        props.as ?? "p",
        {
          ...ctx.attrs,
          "data-scope": "typography",
          "data-part": "heading",
          "data-size": props.size,
        },
        ctx.slots.default?.(),
      );
  },
}) as unknown as Component;

const Display = part("Display", "p");
const Lead = part("Lead", "p");
const Body = part("Body", "p");
const Muted = part("Muted", "p");
const Label = part("Label", "p");

/** The typographic voices, named so prose can ask for one: display and
 * heading ride the song-serif, the rest ride the hei. Nothing here is
 * decorative — hierarchy is size, weight, and space. */

export const Typography = withSelfRoot(
  Object.assign(Display, {
    Display,
    Heading,
    Lead,
    Body,
    Muted,
    Label,
  }),
);
