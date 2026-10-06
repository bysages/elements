import { withSelfRoot } from "../../internal/family";
import SpinnerComponent from "./Spinner.svelte";

/** A wheel of waiting: one arc of ink turning about its center. Quiet by
 * default — it reports progress without claiming attention. */
export const Spinner = withSelfRoot(SpinnerComponent);

export type { SpinnerProps } from "./props";
