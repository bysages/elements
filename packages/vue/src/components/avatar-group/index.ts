import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export const AvatarGroup = defineComponent({
  name: "AvatarGroup",
  props: {
    /** One register for every seal: falls onto data-size for the
     * stylesheet to re-point the avatars' measure. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "avatar-group",
          "data-part": "root",
          "data-size": props.size,
        },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("avatar-group");
