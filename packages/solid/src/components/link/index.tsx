import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps, type JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";

export interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: "always" | "hover" | "none";
}

/** A link is ink in the accent's voice: quiet at rest, deepening under
 * the hand, the halo at focus. The underline follows the prose —
 * always, on hover, or never. */
export const Link = withSelfRoot(function Link(props: LinkProps) {
  injectComponentStyle("link");
  const [own, rest] = splitProps(props, ["underline"]);
  return (
    <a {...rest} data-scope="link" data-part="root" data-underline={own.underline ?? "hover"} />
  );
});
