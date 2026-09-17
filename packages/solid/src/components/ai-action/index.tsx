import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Button } from "../button";

export interface ActionProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  /** What the button does, spoken to assistive tech and shown as
   * the hover title — copy, retry, thumbs. */
  label: string;
}

/** A quiet icon button — copy, retry, thumbs. The label names it to
 * assistive tech and as the hover title. The control itself is the
 * shared Button in its ghost register. */
export function Action(props: ActionProps) {
  const [own, rest] = splitProps(props, ["label", "children"]);
  return (
    <Button variant="ghost" size="sm" square aria-label={own.label} title={own.label} {...rest}>
      {own.children}
    </Button>
  );
}

injectComponentStyle("ai");

export { Action as AiAction };
