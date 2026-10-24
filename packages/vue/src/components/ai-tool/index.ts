import { injectComponentStyle } from "@bysages/core/styling";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../../internal/messages";
import { chevron } from "../ai/chevron";
import { Button } from "../button";
import { Collapsible } from "../collapsible";

export type ToolValue =
  | string
  | number
  | boolean
  | null
  | ToolValue[]
  | { [key: string]: ToolValue };

function formatValue(value: ToolValue | undefined) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || value === null)
    return String(value);
  if (value === undefined) return "";
  return JSON.stringify(value, null, 2) ?? "";
}

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
export const Tool = withSelfRoot(
  defineComponent({
    name: "AiTool",
    inheritAttrs: false,
    props: {
      /** The name the tool was reached by — shown raw on the trigger
       * unless the `label` slot speaks friendlier words. */
      name: { type: String, required: true },
      /** The state the call reached — pending, running, completed,
       * error, or denied; stamped on the fold and whispered in the
       * status chip. */
      status: {
        type: String as PropType<"pending" | "running" | "completed" | "error" | "denied">,
      },
      /** The human approval gate, when the call needs one. */
      approval: { type: String as PropType<"required" | "approved" | "denied"> },
      /** The machine-readable request, formatted when no `input` slot is given. */
      inputValue: {
        type: [String, Number, Boolean, Object, Array] as PropType<ToolValue>,
        default: undefined,
      },
      /** The machine-readable answer, formatted when no `output` slot is given. */
      outputValue: {
        type: [String, Number, Boolean, Object, Array] as PropType<ToolValue>,
        default: undefined,
      },
      /** The fold arrives open when set — rides the shared collapsible. */
      defaultOpen: { type: Boolean, default: false },
    },
    emits: {
      approve: () => true,
      deny: () => true,
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("ai");
      const messages = useComponentMessages();

      return () => {
        const status = props.status;
        return h(
          Collapsible.Root,
          {
            ...ctx.attrs,
            ...(props.defaultOpen ? { defaultOpen: true } : {}),
            "data-ai": "tool",
            ...(status ? { "data-status": status } : {}),
            ...(props.approval ? { "data-approval": props.approval } : {}),
          },
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
                ...(ctx.slots.input || props.inputValue !== undefined
                  ? [
                      h(
                        "span",
                        { "data-scope": "ai", "data-part": "tool-label" },
                        messages.value.ai.input,
                      ),
                      h("pre", ctx.slots.input?.() ?? formatValue(props.inputValue)),
                    ]
                  : []),
                ...(ctx.slots.output || props.outputValue !== undefined
                  ? [
                      h(
                        "span",
                        { "data-scope": "ai", "data-part": "tool-label" },
                        messages.value.ai.output,
                      ),
                      h("pre", ctx.slots.output?.() ?? formatValue(props.outputValue)),
                    ]
                  : []),
                props.approval === "required"
                  ? h(
                      "div",
                      {
                        "data-scope": "ai",
                        "data-part": "tool-actions",
                        "data-approval": props.approval,
                      },
                      () => [
                        h(
                          Button,
                          {
                            variant: "outline",
                            size: "sm",
                            tone: "danger",
                            onClick: () => ctx.emit("deny"),
                          },
                          () => messages.value.ai.deny,
                        ),
                        h(
                          Button,
                          {
                            variant: "solid",
                            size: "sm",
                            onClick: () => ctx.emit("approve"),
                          },
                          () => messages.value.ai.approve,
                        ),
                      ],
                    )
                  : null,
              ];
              return h("div", { "data-scope": "ai", "data-part": "tool-body" }, body);
            }),
          ],
        );
      };
    },
  }),
);
export { Tool as AiTool };
