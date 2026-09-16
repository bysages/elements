import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { chevron } from "../ai/chevron";
import { Collapsible } from "../collapsible";

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
export const Tool = defineComponent({
  name: "AiTool",
  props: {
    /** The name the tool was reached by — shown raw on the trigger
     * unless the `label` slot speaks friendlier words. */
    name: { type: String, required: true },
    /** The state the call reached — pending, running, completed, or
     * error; stamped on the fold and whispered in the status chip. */
    status: { type: String as PropType<"pending" | "running" | "completed" | "error"> },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const status = props.status;
      return h(
        Collapsible.Root,
        { ...ctx.attrs, "data-ai": "tool", ...(status ? { "data-status": status } : {}) },
        () => [
          h(Collapsible.Trigger, () => [
            /* The raw tool name by default; a `label` slot lets the site
               speak friendlier words ("Searching pages…"). */
            h("span", ctx.slots.label?.() ?? props.name),
            status
              ? h(
                  "span",
                  { "data-scope": "ai", "data-part": "tool-status" },
                  status.charAt(0).toUpperCase() + status.slice(1),
                )
              : null,
            h(Collapsible.Indicator, chevron),
          ]),
          h(Collapsible.Content, () => {
            const body = [
              ...(ctx.slots.input
                ? [
                    h("span", { "data-scope": "ai", "data-part": "tool-label" }, "Input"),
                    h("pre", ctx.slots.input()),
                  ]
                : []),
              ...(ctx.slots.output
                ? [
                    h("span", { "data-scope": "ai", "data-part": "tool-label" }, "Output"),
                    h("pre", ctx.slots.output()),
                  ]
                : []),
            ];
            return h("div", { "data-scope": "ai", "data-part": "tool-body" }, body);
          }),
        ],
      );
    };
  },
});

injectComponentStyle("ai");

export { Tool as AiTool };
