import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** A waiting sheet of unset paper. Size it from the outside; the breath
 * is the component's own. */
export const Skeleton = defineComponent({
  name: "Skeleton",
  props: {},
  setup(_, ctx: SetupContext) {
    return () =>
      h("div", {
        ...ctx.attrs,
        "data-scope": "skeleton",
        "data-part": "root",
      });
  },
});

injectComponentStyle("skeleton");
