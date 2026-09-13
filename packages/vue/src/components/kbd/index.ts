import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** A keycap in miniature, riding the type it annotates. */
export const Kbd = defineComponent({
  name: "Kbd",
  props: {},
  setup(_, ctx: SetupContext) {
    return () =>
      h(
        "kbd",
        {
          ...ctx.attrs,
          "data-scope": "kbd",
          "data-part": "root",
        },
        ctx.slots.default?.(),
      );
  },
});

injectComponentStyle("kbd");
