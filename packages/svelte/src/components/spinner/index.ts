import { injectComponentStyle } from "@bysages/core";
import SpinnerComponent from "./Spinner.svelte";

/** A wheel of waiting: one arc of ink turning about its center. Quiet by
 * default — it reports progress without claiming attention. */
export const Spinner = SpinnerComponent;

export type { SpinnerProps } from "./props";

injectComponentStyle("spinner");
