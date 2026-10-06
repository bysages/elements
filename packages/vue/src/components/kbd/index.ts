import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";

/** A keycap in miniature, riding the type it annotates. */
export const Kbd = withSelfRoot(
  defineComponent({
    name: "Kbd",
    props: {},
    setup(_, ctx: SetupContext) {
      injectComponentStyle("kbd");

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
  }),
);
