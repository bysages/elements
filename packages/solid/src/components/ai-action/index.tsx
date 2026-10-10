import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { Button } from "../button";

export interface ActionProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  /** What the button does, spoken to assistive tech and shown as
   * the hover title — copy, retry, thumbs. */
  label: string;
}

/** A quiet icon button — copy, retry, thumbs. The label names it to
 * assistive tech and as the hover title. The control itself is the
 * shared Button in its ghost register. */
export const Action = withSelfRoot(function Action(props: ActionProps) {
  injectComponentStyle("ai");
  const [own, rest] = splitProps(props, ["label", "children"]);
  return (
    <Button variant="ghost" size="sm" square aria-label={own.label} title={own.label} {...rest}>
      {own.children}
    </Button>
  );
});
export { Action as AiAction };
