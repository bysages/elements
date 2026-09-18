import { injectComponentStyle } from "@bysages/core";

import EllipsisComponent from "./Ellipsis.svelte";

/** The overflow knife: text cut at one line, or held to N lines. The
 * primitive only draws the cut — reaching the full text (title,
 * tooltip) stays the consumer's decision. */
export const Ellipsis = EllipsisComponent;

export type { EllipsisProps } from "./props";

injectComponentStyle("ellipsis");
