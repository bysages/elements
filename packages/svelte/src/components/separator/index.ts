import { injectComponentStyle } from "@bysages/core";

import SeparatorComponent from "./Separator.svelte";

/** The paper-ink hairline as a component: a named rule between sections.
 * Decorative separators drop the separator role, since the page reads
 * fine without them. */
export const Separator = SeparatorComponent;

export type { SeparatorProps } from "./props";

injectComponentStyle("separator");
