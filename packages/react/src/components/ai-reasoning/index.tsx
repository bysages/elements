import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

import { chevron } from "../ai/chevron";
import { Collapsible } from "../collapsible";

/** The model's thought, folded by the shared collapsible in its quiet
 * register: bare ink for a trigger, the thought on one hairline. */
export interface ReasoningProps extends HTMLAttributes<HTMLDivElement> {
  /** The trigger's words — the fold arrives open under them. */
  label?: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

export function Reasoning({ label = "Thinking", children, ...rest }: ReasoningProps) {
  return (
    <Collapsible.Root {...rest} data-ai="reasoning">
      <Collapsible.Trigger>
        <span>{label}</span>
        <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div data-scope="ai" data-part="reasoning-content">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

injectComponentStyle("ai");

export { Reasoning as AiReasoning };
