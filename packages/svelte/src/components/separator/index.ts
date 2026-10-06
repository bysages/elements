import { withSelfRoot } from "../../internal/family";
import SeparatorComponent from "./Separator.svelte";

/** The paper-ink hairline as a component: a named rule between sections.
 * Decorative separators drop the separator role, since the page reads
 * fine without them. */
export const Separator = withSelfRoot(SeparatorComponent);

export type { SeparatorProps } from "./props";
