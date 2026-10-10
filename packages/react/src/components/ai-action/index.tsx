import { injectComponentStyle } from "@bysages/core/styling";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";
import { Button } from "../button";

/** A quiet icon button — copy, retry, thumbs. The label names it to
 * assistive tech and as the hover title. The control itself is the
 * shared Button in its ghost register. */
export interface ActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** What the button does, spoken to assistive tech and shown as the
   * hover title — copy, retry, thumbs. */
  label: string;
  children?: ReactNode;
}

function ActionImpl({ label, children, ...rest }: ActionProps) {
  injectComponentStyle("ai");
  return (
    <Button variant="ghost" size="sm" square aria-label={label} title={label} {...rest}>
      {children}
    </Button>
  );
}

export const Action = withSelfRoot(ActionImpl);
export { Action as AiAction };
