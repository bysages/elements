import { injectComponentStyle } from "@bysages/core";
import type { AnchorHTMLAttributes } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: "always" | "hover" | "none";
}

/** A link is ink in the accent's voice: quiet at rest, deepening under
 * the hand, the halo at focus. The underline follows the prose —
 * always, on hover, or never. */
export function Link({ underline = "hover", children, ...rest }: LinkProps) {
  return (
    <a {...rest} data-scope="link" data-part="root" data-underline={underline}>
      {children}
    </a>
  );
}

injectComponentStyle("link");
