import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { Button } from "../button";

/** A quiet icon button — copy, retry, thumbs. The label names it to
 * assistive tech and as the hover title. The control itself is the
 * shared Button in its ghost register. */
export const Action = defineComponent({
  name: "AiAction",
  props: {
    /** What the button does, spoken to assistive tech and shown as
     * the hover title — copy, retry, thumbs. */
    label: { type: String, required: true },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        Button,
        {
          variant: "ghost",
          size: "sm",
          square: true,
          "aria-label": props.label,
          title: props.label,
        },
        ctx.slots.default,
      );
  },
});

injectComponentStyle("ai");

export { Action as AiAction };
