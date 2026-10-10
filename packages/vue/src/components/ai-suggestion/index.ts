import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";
import { Button } from "../button";

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. The shared Button in its outline register. */
export const Suggestion = withSelfRoot(
  defineComponent({
    name: "AiSuggestion",
    props: {
      /** The next stroke this seal proposes — also its label; handed
       * back whole on `select`. */
      prompt: { type: String, required: true },
    },
    emits: {
      select: (_prompt: string) => true,
    },
    setup(props, { emit }) {
      injectComponentStyle("ai");

      return () =>
        h(
          Button,
          { variant: "outline", size: "sm", onClick: () => emit("select", props.prompt) },
          () => props.prompt,
        );
    },
  }),
);
export { Suggestion as AiSuggestion };
