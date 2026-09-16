import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h } from "vue";

import { Button } from "../button";

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. The shared Button in its outline register. */
export const Suggestion = defineComponent({
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
    return () =>
      h(
        Button,
        { variant: "outline", size: "sm", onClick: () => emit("select", props.prompt) },
        () => props.prompt,
      );
  },
});

injectComponentStyle("ai");

export { Suggestion as AiSuggestion };
