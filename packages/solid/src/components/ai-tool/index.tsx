import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { chevron } from "../ai/chevron";
import { Button } from "../button";
import { Collapsible } from "../collapsible";
import { useComponentMessages } from "../config-provider/use-component-messages";

export type ToolStatus = "pending" | "running" | "completed" | "error" | "denied";
export type ToolApproval = "required" | "approved" | "denied";

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

export interface ToolProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The name the tool was reached by — shown raw on the trigger
   * unless friendlier `label` words are given. */
  name: string;
  /** Friendlier trigger words than the raw tool name. */
  label?: JSX.Element;
  /** The state the call reached — pending, running, completed, error,
   * or denied; stamped on the fold and whispered in the status chip. */
  status?: ToolStatus;
  /** The human approval gate, when the call needs one. */
  approval?: ToolApproval;
  /** Custom request display. */
  input?: JSX.Element;
  /** The machine-readable request, formatted automatically. */
  inputValue?: ToolValue;
  /** Custom answer display. */
  output?: JSX.Element;
  /** The machine-readable answer, formatted automatically. */
  outputValue?: ToolValue;
  /** The fold arrives open when set — rides the shared collapsible. */
  defaultOpen?: boolean;
  onApprove?: () => void;
  onDeny?: () => void;
}

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
export const Tool = withSelfRoot(function Tool(props: ToolProps) {
  injectComponentStyle("ai");
  const messages = useComponentMessages();
  const [own, rest] = splitProps(props, [
    "name",
    "label",
    "status",
    "approval",
    "input",
    "inputValue",
    "output",
    "outputValue",
    "defaultOpen",
    "onApprove",
    "onDeny",
  ]);
  const inputContent =
    own.input ?? (own.inputValue !== undefined ? formatValue(own.inputValue) : null);
  const outputContent =
    own.output ?? (own.outputValue !== undefined ? formatValue(own.outputValue) : null);

  return (
    <Collapsible.Root
      {...rest}
      {...(own.defaultOpen ? { defaultOpen: true } : {})}
      data-ai="tool"
      {...(own.status ? { "data-status": own.status } : {})}
      {...(own.approval ? { "data-approval": own.approval } : {})}
    >
      <Collapsible.Trigger>
        <span>{own.label ?? own.name}</span>
        <Show when={own.status}>
          <span data-scope="ai" data-part="tool-status">
            {own.status!.charAt(0).toUpperCase() + own.status!.slice(1)}
          </span>
        </Show>
        <Collapsible.Indicator>{chevron()}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div data-scope="ai" data-part="tool-body">
          <Show when={inputContent != null}>
            <span data-scope="ai" data-part="tool-label">
              {messages().ai.input}
            </span>
            <pre>{inputContent}</pre>
          </Show>
          <Show when={outputContent != null}>
            <span data-scope="ai" data-part="tool-label">
              {messages().ai.output}
            </span>
            <pre>{outputContent}</pre>
          </Show>
          <Show when={own.approval === "required"}>
            <div data-scope="ai" data-part="tool-actions" data-approval={own.approval}>
              <Button variant="outline" size="sm" tone="danger" onClick={() => own.onDeny?.()}>
                {messages().ai.deny}
              </Button>
              <Button variant="solid" size="sm" onClick={() => own.onApprove?.()}>
                {messages().ai.approve}
              </Button>
            </div>
          </Show>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
});
export { Tool as AiTool };
