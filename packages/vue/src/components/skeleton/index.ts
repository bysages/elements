import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";

/** A waiting sheet of unset paper. Size it from the outside; the breath
 * is the component's own. */
export const Skeleton = withSelfRoot(
  defineComponent({
    name: "Skeleton",
    props: {},
    setup(_, ctx: SetupContext) {
      injectComponentStyle("skeleton");

      return () =>
        h("div", {
          ...ctx.attrs,
          "data-scope": "skeleton",
          "data-part": "root",
        });
    },
  }),
);
