import { injectComponentStyle } from "@bysages/core";

import AspectRatioComponent from "./AspectRatio.svelte";

/** A frame that keeps its shape: the box holds the given ratio whatever
 * the width it is dealt, and the child fills the frame it is given. */
export const AspectRatio = AspectRatioComponent;

export type { AspectRatioProps } from "./props";

injectComponentStyle("aspect-ratio");
