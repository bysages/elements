import { withSelfRoot } from "../../internal/family";
import SpotlightComponent from "./Spotlight.svelte";

/** The ink-light card: a vessel whose rim and face take light from the
 * reader's hand. */
export const Spotlight = withSelfRoot(SpotlightComponent);

export type { SpotlightProps } from "./props";
