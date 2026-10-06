import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";

/** A link is ink in the accent's voice: quiet at rest, deepening under
 * the hand, the halo at focus. The underline follows the prose —
 * always, on hover, or never. */
export const Link = withSelfRoot(
  defineComponent({
    name: "Link",
    props: {
      underline: {
        type: String as PropType<"always" | "hover" | "none">,
        default: "hover",
      },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("link");

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
  }),
);
