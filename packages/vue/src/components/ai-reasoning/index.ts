import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { chevron } from "../ai/chevron";
import { Collapsible } from "../collapsible";

/** The model's thought, folded by the shared collapsible in its quiet
 * register: bare ink for a trigger, the thought on one hairline. */
export const Reasoning = defineComponent({
  name: "AiReasoning",
  props: {
    /** The trigger's words — the fold arrives open under them. */
    label: { type: String, default: "Thinking" },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(Collapsible.Root, { ...ctx.attrs, "data-ai": "reasoning" }, () => [
        h(Collapsible.Trigger, () => [h("span", props.label), h(Collapsible.Indicator, chevron)]),
        h(Collapsible.Content, () =>
          h("div", { "data-scope": "ai", "data-part": "reasoning-content" }, ctx.slots.default?.()),
        ),
      ]);
  },
});

injectComponentStyle("ai");

export { Reasoning as AiReasoning };
