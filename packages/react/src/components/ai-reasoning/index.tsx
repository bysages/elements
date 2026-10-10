import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";
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

function ReasoningImpl({ label = "Thinking", children, ...rest }: ReasoningProps) {
  injectComponentStyle("ai");
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

export const Reasoning = withSelfRoot(ReasoningImpl);
export { Reasoning as AiReasoning };
