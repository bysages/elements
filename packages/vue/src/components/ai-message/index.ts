import { injectComponentStyle } from "@bysages/core/styling";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export const Message = withSelfRoot(
  defineComponent({
    name: "AiMessage",
    inheritAttrs: false,
    props: {
      /** Whose stroke this is — the user's words sit in a recessed
       * bubble, the assistant speaks flat on the paper. */
      role: {
        type: String as PropType<"user" | "assistant" | "system">,
        default: "assistant",
      },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("ai");

      return () =>
        h(
          "article",
          {
            ...ctx.attrs,
            "data-scope": "ai",
            "data-part": "message",
            "data-role": props.role,
          },
          ctx.slots.default?.(),
        );
    },
  }),
);
export { Message as AiMessage };
