import { withSelfRoot } from "../../internal/family";
import TagComponent from "./Tag.svelte";

/** A small named seal for filtering and cataloguing. The resting shape
 * is a span; `checkable` raises it to a pressed button, and `closable`
 * hangs the removal seal inside — dismissal stays the consumer's state,
 * the way the banner's does. */
export const Tag = withSelfRoot(TagComponent);

export type { TagProps } from "./props";
