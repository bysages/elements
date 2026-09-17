import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

import { chevron } from "../ai/chevron";
import { Collapsible } from "../collapsible";

export type ToolStatus = "pending" | "running" | "completed" | "error";

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
export interface ToolProps extends HTMLAttributes<HTMLDivElement> {
  /** The name the tool was reached by — shown raw on the trigger
   * unless a `label` speaks friendlier words ("Searching pages…"). */
  name: string;
  label?: ReactNode;
  /** The state the call reached — pending, running, completed, or
   * error; stamped on the fold and whispered in the status chip. */
  status?: ToolStatus;
  defaultOpen?: boolean;
  input?: ReactNode;
  output?: ReactNode;
}

export function Tool({ name, label, status, input, output, ...rest }: ToolProps) {
  return (
    <Collapsible.Root {...rest} data-ai="tool" data-status={status}>
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
          {input ? (
            <>
              <span data-scope="ai" data-part="tool-label">
                Input
              </span>
              <pre>{input}</pre>
            </>
          ) : null}
          {output ? (
            <>
              <span data-scope="ai" data-part="tool-label">
                Output
              </span>
              <pre>{output}</pre>
            </>
          ) : null}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

injectComponentStyle("ai");

export { Tool as AiTool };
