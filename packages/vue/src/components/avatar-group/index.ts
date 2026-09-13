import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export const AvatarGroup = defineComponent({
  name: "AvatarGroup",
  props: {},
  setup(_, ctx: SetupContext) {
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "avatar-group",
          "data-part": "root",
        },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("avatar-group");
