import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../../internal/messages";
import { chevron } from "../ai/chevron";
import { Button } from "../button";
import { Collapsible } from "../collapsible";

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

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
export interface ToolProps extends HTMLAttributes<HTMLDivElement> {
  /** The name the tool was reached by — shown raw on the trigger
   * unless a `label` speaks friendlier words ("Searching pages…"). */
  name: string;
  label?: ReactNode;
  /** The state the call reached — pending, running, completed, error,
   * or denied; stamped on the fold and whispered in the status chip. */
  status?: ToolStatus;
  /** The human approval gate, when the call needs one. */
  approval?: ToolApproval;
  /** Custom request display; structured data can ride `inputValue`. */
  input?: ReactNode;
  /** The machine-readable request, formatted automatically. */
  inputValue?: ToolValue;
  /** Custom answer display; structured data can ride `outputValue`. */
  output?: ReactNode;
  /** The machine-readable answer, formatted automatically. */
  outputValue?: ToolValue;
  /** The fold arrives open when set — rides the shared collapsible. */
  defaultOpen?: boolean;
  onApprove?: () => void;
  onDeny?: () => void;
}

function ToolImpl({
  name,
  label,
  status,
  approval,
  input,
  inputValue,
  output,
  outputValue,
  defaultOpen = false,
  onApprove,
  onDeny,
  ...rest
}: ToolProps) {
  injectComponentStyle("ai");
  const messages = useComponentMessages();
  const inputContent = input ?? (inputValue !== undefined ? formatValue(inputValue) : null);
  const outputContent = output ?? (outputValue !== undefined ? formatValue(outputValue) : null);

  return (
    <Collapsible.Root
      {...rest}
      defaultOpen={defaultOpen}
      data-ai="tool"
      data-status={status}
      data-approval={approval}
    >
      <Collapsible.Trigger>
        <span>{label ?? name}</span>
        {status ? (
          <span data-scope="ai" data-part="tool-status">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ) : null}
        <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div data-scope="ai" data-part="tool-body">
          {inputContent != null ? (
            <>
              <span data-scope="ai" data-part="tool-label">
                {messages.ai.input}
              </span>
              <pre>{inputContent}</pre>
            </>
          ) : null}
          {outputContent != null ? (
            <>
              <span data-scope="ai" data-part="tool-label">
                {messages.ai.output}
              </span>
              <pre>{outputContent}</pre>
            </>
          ) : null}
          {approval === "required" ? (
            <div data-scope="ai" data-part="tool-actions" data-approval={approval}>
              <Button variant="outline" size="sm" tone="danger" onClick={() => onDeny?.()}>
                {messages.ai.deny}
              </Button>
              <Button variant="solid" size="sm" onClick={() => onApprove?.()}>
                {messages.ai.approve}
              </Button>
            </div>
          ) : null}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export const Tool = withSelfRoot(ToolImpl);
export { Tool as AiTool };
