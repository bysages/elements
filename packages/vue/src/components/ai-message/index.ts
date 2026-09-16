import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export const Message = defineComponent({
  name: "AiMessage",
  props: {
    /** Whose stroke this is — the user's words sit in a recessed
     * bubble, the assistant speaks flat on the paper. */
    role: {
      type: String as PropType<"user" | "assistant" | "system">,
      default: "assistant",
    },
  },
  setup(props, ctx: SetupContext) {
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
});

injectComponentStyle("ai");

export { Message as AiMessage };
