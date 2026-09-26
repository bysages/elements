import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

/** A link is ink in the accent's voice: quiet at rest, deepening under
 * the hand, the halo at focus. The underline follows the prose —
 * always, on hover, or never. */
export const Link = defineComponent({
  name: "Link",
  props: {
    underline: {
      type: String as PropType<"always" | "hover" | "none">,
      default: "hover",
    },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "a",
        {
          ...ctx.attrs,
          "data-scope": "link",
          "data-part": "root",
          "data-underline": props.underline,
        },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("link");
