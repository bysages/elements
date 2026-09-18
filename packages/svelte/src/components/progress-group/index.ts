import { injectComponentStyle } from "@bysages/core";

import ProgressGroupComponent from "./ProgressGroup.svelte";

/** One bar, several verdicts: the segments stand shoulder to shoulder,
 * each as wide as its share of the whole and speaking its own pigment;
 * the legend reads them back beneath (swatch, label, value) unless the
 * caller declines it. The whole is the sum of the parts unless the
 * caller brings a larger one — the remainder then shows as groove. */
export const ProgressGroup = ProgressGroupComponent;

export type { ProgressGroupProps, ProgressSegment } from "./props";

injectComponentStyle("progress-group");
