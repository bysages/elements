import { injectComponentStyle } from "@bysages/core";
import { Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { chevron } from "../ai/chevron";
import { Collapsible } from "../collapsible";

export type ToolStatus = "pending" | "running" | "completed" | "error";

export interface ToolProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The name the tool was reached by — shown raw on the trigger
   * unless friendlier `label` words are given. */
  name: string;
  /** Friendlier trigger words than the raw tool name. */
  label?: JSX.Element;
  /** The state the call reached — pending, running, completed, or
   * error; stamped on the fold and whispered in the status chip. */
  status?: ToolStatus;
  /** The fold arrives open when set — rides the shared collapsible. */
  defaultOpen?: boolean;
  input?: string;
  output?: string;
}

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
export function Tool(props: ToolProps) {
  const [own, rest] = splitProps(props, ["name", "label", "status", "input", "output"]);
  return (
    <Collapsible.Root
      {...rest}
      data-ai="tool"
      {...(own.status ? { "data-status": own.status } : {})}
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
          <Show when={own.input !== undefined}>
            <span data-scope="ai" data-part="tool-label">
              Input
            </span>
            <pre>{own.input}</pre>
          </Show>
          <Show when={own.output !== undefined}>
            <span data-scope="ai" data-part="tool-label">
              Output
            </span>
            <pre>{own.output}</pre>
          </Show>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

injectComponentStyle("ai");

export { Tool as AiTool };
