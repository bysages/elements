import { injectComponentStyle } from "@bysages/core/styling";
import type { UIMessage } from "ai";
import type { PropType, SetupContext } from "vue";
import { computed, defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";
import type { AiSdkMessage } from "../ai/parts";

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. The message type follows the
 * application's AI SDK `UIMessage` contract. */
export interface MessageProps<MESSAGE extends AiSdkMessage = AiSdkMessage> {
  role?: "user" | "assistant" | "system";
  /** The AI SDK message; its id and role become the article identity. */
  message?: MESSAGE;
}

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
      /** The AI SDK message; its id and role become the article identity. */
      message: { type: Object as PropType<UIMessage>, default: undefined },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("ai");
      const role = computed(() => props.message?.role ?? props.role);

      return () =>
        h(
          "article",
          {
            ...ctx.attrs,
            "data-scope": "ai",
            "data-part": "message",
            ...(props.message ? { "data-message-id": props.message.id } : {}),
            "data-role": role.value,
          },
          ctx.slots.default?.(),
        );
    },
  }),
);
export { Message as AiMessage };
