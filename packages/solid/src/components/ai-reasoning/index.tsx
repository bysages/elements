import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { chevron } from "../ai/chevron";
import { Collapsible } from "../collapsible";

export interface ReasoningProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The trigger's words — the fold arrives open under them. */
  label?: string;
  /** The fold arrives open when set — rides the shared collapsible. */
  defaultOpen?: boolean;
}

/** The model's thought, folded by the shared collapsible in its quiet
 * register: bare ink for a trigger, the thought on one hairline. */
export const Reasoning = withSelfRoot(function Reasoning(props: ReasoningProps) {
  injectComponentStyle("ai");
  const [own, rest] = splitProps(props, ["label", "children"]);
  return (
    <Collapsible.Root {...rest} data-ai="reasoning">
      <Collapsible.Trigger>
        <span>{own.label ?? "Thinking"}</span>
        <Collapsible.Indicator>{chevron()}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div data-scope="ai" data-part="reasoning-content">
          {own.children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
});
export { Reasoning as AiReasoning };
