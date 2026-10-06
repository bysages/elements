import { withSelfRoot } from "../../internal/family";
import DeferredContentComponent from "./DeferredContent.svelte";

/** Content that waits to be worth rendering: the slot mounts when the
 * placeholder approaches the viewport. */
export const DeferredContent = withSelfRoot(DeferredContentComponent);

export type { DeferredContentProps } from "./props";
