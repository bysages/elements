import { withSelfRoot } from "../../internal/family";
import LinkComponent from "./Link.svelte";

/** A link is ink in the accent's voice: quiet at rest, deepening under
 * the hand, the halo at focus. */
export const Link = withSelfRoot(LinkComponent);

export type { LinkProps } from "./props";
